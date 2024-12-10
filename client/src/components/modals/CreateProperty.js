import React, { useState } from 'react';
import { useContext } from "react";
import Select from "react-dropdown-select";
import { Context } from "../../index";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { createProperty } from "../../http/propertyApi";

const CreateProperty = ({ show, onHide }) => {

    const { property } = useContext(Context);

    const paymentTermOptions = property.paymentTerms.map(paymentTerm => ({
        label: paymentTerm.name,
        value: paymentTerm.id
    }));

    const typeOptions = property.propertyTypes.map(type => ({
        label: type.name,
        value: type.id
    }));

    const [type, setType] = useState(false)
    const [paymentTerm, setPaymentTerm] = useState(false)
    const [name, setName] = useState(false)
    const [description, setDescription] = useState(false)
    const [price, setPrice] = useState(false)
    const [address, setAddress] = useState(false)
    const [photo, setPhoto] = useState(false)

    const clearForm = () => {
        setType(false)
        setPaymentTerm(false)
        setName(false)
        setDescription(false)
        setPrice(false)
        setAddress(false)
        setPhoto(false)
    }

    const addProperty = () => {
        if (!isValid()) {
            return
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description ? description : '')
        formData.append('price', `${price}`)
        formData.append('address', address)
        formData.append('propertyPaymentTermId', paymentTerm)
        formData.append('propertyTypeId', type)
        formData.append('img', photo)
        createProperty(formData).then(data => {
            clearForm()
            toast.success('Добавлена новая недвижемость');
            onHide()
        }).catch(e => {
            console.error(e);
            toast.error('Ошибка при добавлении недвижемости');
        })
    }

    const isValid = () => {
        if (type && paymentTerm && name && price && address && photo) {
            return true
        }
        toast.error('Для добавления недвижемости необходимо заполнить все поля');
        return false
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить недвижемость
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Название"} className='mt-2' onChange={e => setName(e.target.value)} />
                    <Form.Control placeholder={"Адресс"} className='mt-2' onChange={e => setAddress(e.target.value)} />
                    <Select options={typeOptions} placeholder={"Тип"} className='mt-2' onChange={e => setType(e[0].value)} />
                    <Form.Control type="number" placeholder={"Цена"} className='mt-2' onChange={e => setPrice(e.target.value)} />
                    <Select options={paymentTermOptions} placeholder={"Период оплаты"} className='mt-2' onChange={e => setPaymentTerm(e[0].value)} />
                    <Form.Control type="file" placeholder={"Фото"} className='mt-2' onChange={e => setPhoto(e.target.files[0])} />
                    <Form.Control as="textarea" rows={3} placeholder={"Описание"} className='mt-2' onChange={e => setDescription(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProperty}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default CreateProperty;