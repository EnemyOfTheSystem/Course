import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { createManager } from "../../http/userApi";

const CreateManager = ({ show, onHide }) => {

    const [firstName, setFirstName] = useState(false)
    const [lastName, setLastName] = useState(false)
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const clearForm = () => {
        setFirstName(false)
        setLastName(false)
        setEmail(false)
        setPassword(false)
        setEmailError('');
        setPasswordError('');
        setLastNameError('');
    }

    const addManager = () => {
        if (!isInputsValid()) {
            return
        }
        createManager(email, password, firstName ? firstName : '', lastName).then(data => {
            toast.success('Менеджер успешно добавлен');
            close()
        }).catch(e => {
            console.error(e);
            toast.error(e.response.data.message);
        })
    }

    const isInputsValid = () => {
        let isValid = true;
        if (!isValidEmail(email)) {
            setEmailError('Некорректный email');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!password || password.length < 4) {
            setPasswordError('Пароль должен быть больше 4 символов');
            isValid = false;
        } else {
            setPasswordError('');
        }
        console.log(lastName.length)
        if (!lastName || lastName.length < 2) {
            setLastNameError('Имя должно быть больше 2 символов');
            isValid = false;
        } else {
            setLastNameError('');
        }
        return isValid;
    }


    const close = () => {
        clearForm()
        onHide()
    }


    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить пользователя с ролью менеджера
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Имя"} className='mt-2' onChange={e => setFirstName(e.target.value)} />
                    <Form.Control placeholder={"Фамилия"} className='mt-2' onChange={e => setLastName(e.target.value)} />
                    {lastNameError && <span style={{ color: 'red' }}>{lastNameError}</span>}
                    <Form.Control placeholder={"E-mail"} type='email' className='mt-2' onChange={e => setEmail(e.target.value)} />
                    {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                    <Form.Control placeholder={"Пароль"} type='password' className='mt-2' onChange={e => setPassword(e.target.value)} />
                    {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={close}>Закрыть</Button>
                <Button variant="outline-success" onClick={addManager}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default CreateManager;