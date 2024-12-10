import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { downloadPropertyReport } from "../../http/propertyApi";

const CreateReport = ({ show, onHide }) => {
    const [name, setName] = useState(undefined);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [validationMessage, setValidationMessage] = useState(undefined);

    const generateReport = () => {
        if (!isValid()) {
            return;
        }
        downloadPropertyReport(startDate, endDate, name).then((response) => {
            console.log(response);
            const uint8Array = new TextEncoder().encode(response); // Convert the response to a Uint8Array
            const blob = new Blob([uint8Array], { type: 'text/csv;charset=utf-8' }); // Set the encoding to UTF-8

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.csv');
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            onHide();
            clearModal();
        });

    };

    const clearModal = () => {
        setName(undefined);
        setStartDate(undefined);
        setEndDate(undefined);
        setValidationMessage(undefined);
    };

    const isValid = () => {
        if (name && startDate && endDate) {
            if (new Date(startDate) <= new Date(endDate)) {
                setValidationMessage(undefined);
                return true;
            } else {
                setValidationMessage('Дата окончания должна быть после или равна дате начала');
                return false;
            }
        }

        setValidationMessage('Пожалуйста, заполните все поля');
        return false;
    };
    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание отчета о заявках
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder="Название отчета" className="mt-2" onChange={e => setName(e.target.value)} />
                    <div className="d-flex mt-2 justify-content-between align-items-center">
                        <div>Начиная:</div>
                        <Form.Control style={{ width: '80%' }} type="date" placeholder="Дата начала" className="mt-2" onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="d-flex mt-2 justify-content-between align-items-center">
                        <div>Заканчивая:</div>
                        <Form.Control style={{ width: '80%' }} type="date" placeholder="Дата окончания" className="mt-2" onChange={e => setEndDate(e.target.value)} />
                    </div>

                    {validationMessage && <span style={{ color: 'red' }}>{validationMessage}</span>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={generateReport}>Создать отчет</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateReport;