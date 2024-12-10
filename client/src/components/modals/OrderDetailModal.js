import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";

const MakeOrderModal = ({ show, onHide, order }) => {

    const createdAt = new Date(order.createdAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Подробнее о заявке
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div><span style={{ fontWeight: "bold" }}>Заявка была оставлена:</span> {createdAt}</div>
                    <div><span style={{ fontWeight: "bold" }}>Заявку оставил:</span> {order.user.firstName} {order.user.lastName} ({order.user.email})</div>
                    <div><span style={{ fontWeight: "bold" }}>Телефон для связи:</span> {order.phone}</div>
                    <div><span style={{ fontWeight: "bold" }}>Комментарий к заявке:</span> {order.message}</div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>ОК</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default MakeOrderModal;