import React, { useState } from 'react';
import { useContext } from "react";
import { Context } from "../../index";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { createOrder } from "../../http/orderApi";

const MakeOrderModal = ({ show, onHide, userId, propertyId }) => {

    const phoneValidationRegex = /^\+375\d{9}$/;
    const { user } = useContext(Context);

    const [message, setMessage] = useState(false)
    const [phone, setPhone] = useState(false)
    const [validationMessage, setValidationMessage] = useState(false)

    const makeOrder = () => {
        if (!isValid()) {
            return
        }
        createOrder({
            phone,
            message: message ? message : '',
            status: 'Новая',
            userId: user.user.id,
            propertyId
        }).then(data => {
            toast.success('Заявка успешно создана! Ожидайте звонка');
            closeModal()
        }).catch(e => {
            console.error(e);
            toast.error('Ошибка при создании заявки');
        })
    }

    const isValid = () => {
        if (!phone || !phoneValidationRegex.test(phone)) {
            setValidationMessage('Введите валидный телефон для связи')
            return false
        }
        return true
    }

    const clearForm = () => {
        setMessage(false)
        setPhone(false)
        setValidationMessage(false)
    }

    const closeModal = () => {
        onHide()
        clearForm()
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оставить заявку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Введите телефон для связи"} type='phone' className='mt-2' onChange={e => setPhone(e.target.value)} />
                    {validationMessage && <span style={{ color: 'red' }}>{validationMessage}</span>}
                    <Form.Control as="textarea" placeholder={"Дополнительный комментарий к заявке"} maxLength={255} className='mt-2' onChange={e => setMessage(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeModal}>Закрыть</Button>
                <Button variant="outline-success" onClick={makeOrder}>Оставить заявку</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default MakeOrderModal;