import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createPropertyType } from "../../http/propertyApi";
import { toast } from 'react-toastify';

const CreatePropertyType = ({ show, onHide }) => {

    const [name, setName] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [validationMessage, setValidationMessage] = useState(undefined)

    const addPropertyType = () => {
        if (isValid()) {
            let propertyType = { name, description }
            console.log('Try to create propertyType', propertyType)
            createPropertyType(propertyType).then(data => {
                console.log('PropertyType created', data)
                onHide()
                clearModal()
                toast.success('Добавлен новый тип недвижемости');
            })
        }
    }

    const clearModal = () => {
        setName(undefined)
        setDescription(undefined)
    }

    const isValid = () => {
        if (name) {
            setValidationMessage(undefined)
            return true
        }
        setValidationMessage('Название не может быть пустым')
        return false
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип недвижемости
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Название"} className='mt-2' onChange={e => setName(e.target.value)} />
                    {validationMessage && <span style={{ color: 'red' }}>{validationMessage}</span>}
                    <Form.Control as="textarea" rows={3} placeholder={"Описание"} className='mt-2' onChange={e => setDescription(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPropertyType}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default CreatePropertyType;