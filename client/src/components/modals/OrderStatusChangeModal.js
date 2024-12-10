import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateOrder } from '../../http/orderApi';
import { toast } from 'react-toastify';


const OrderStatusChangeModal = ({ show, onHide, order }) => {

    const STATUS_OPTIONS = [
        { value: 'В обработке', label: 'В обработке' },
        { value: 'Одобрен', label: 'Одобрен' },
        { value: 'Отклонен', label: 'Отклонен' }
    ];

    const [selectedStatus, setSelectedStatus] = useState(order.status);

    const clearForm = () => {
        setSelectedStatus(order.status);
    }

    const updateStatus = () => {
        if (selectedStatus) {
            updateOrder({ id: order.id, status: selectedStatus }).then(() => {
                toast.success('Статус заявки успешно изменен!');
                onHide();
                clearForm();
            });
        }
    }

    const closeModal = () => {
        onHide();
        clearForm();
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменение статуса заявки
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Статус:</Form.Label>
                        <Form.Control as="select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            {STATUS_OPTIONS.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={closeModal}>Отмена</Button>
                <Button variant="outline-success" onClick={updateStatus}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderStatusChangeModal;