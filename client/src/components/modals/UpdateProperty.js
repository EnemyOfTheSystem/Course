import React, { useEffect, useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateProperty } from "../../http/propertyApi";
import { Context } from '../../index';

const UpdateProperty = ({ show, onHide, propertyToEdit }) => {

    const { property } = useContext(Context);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        setName(propertyToEdit.name || "");
        setDescription(propertyToEdit.description || "");
        setPrice(propertyToEdit.price || "");
        setAddress(propertyToEdit.address || "");

    }, [propertyToEdit]);

    const clearForm = () => {
        // Очистить поля формы
        setName("");
        setDescription("");
        setPrice("");
        setAddress("");
    };

    const updateProp = () => {
        if (isValid()) {
            const data = {
                id: propertyToEdit.id,
                name,
                description,
                price,
                address,
            };
            updateProperty(data).then(() => {
                clearForm();
                onHide();
                property.refreshPropertyData();
            });
        }
    };

    const isValid = () => {
        if (name && price && address) {
            return true;
        }
        return false;
    };

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить недвижимость
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Название"} className='mt-2' value={name} onChange={e => setName(e.target.value)} />
                    <Form.Control placeholder={"Адрес"} className='mt-2' value={address} onChange={e => setAddress(e.target.value)} />
                    <Form.Control type="number" placeholder={"Цена"} value={price} className='mt-2' onChange={e => setPrice(e.target.value)} />
                    <Form.Control as="textarea" rows={3} placeholder={"Описание"} value={description} className='mt-2' onChange={e => setDescription(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updateProp}>Обновить</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default UpdateProperty;