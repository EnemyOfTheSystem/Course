import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { NavLink, useLocation } from "react-router-dom";
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesBackground from "../components/ParticlesBackground";

const Auth = observer(() => {

    const navigate = useNavigate();
    const { user } = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const clearAllData = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmailError('');
        setPasswordError('');
        setLastNameError('');
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const isInputsValid = () => {
        let isValid = true;
        if (!isLogin && !isValidEmail(email)) {
            setEmailError('Некорректный email');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!isLogin && password.length < 4) {
            setPasswordError('Пароль должен быть больше 4 символов');
            isValid = false;
        } else {
            setPasswordError('');
        }
        if (!isLogin && lastName.length < 2) {
            setLastNameError('Имя должно быть больше 2 символов');
            isValid = false;
        } else {
            setLastNameError('');
        }
        return isValid;
    }

    const click = async () => {
        if (!isInputsValid()) return;
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, firstName, lastName)
            }
            console.log('login' + JSON.stringify(data));
            user.setUser(data);
            user.setIsAuth(true);
            navigate('/?toast=success');
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }
    return (

        <div>
            <ParticlesBackground />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: window.innerHeight - 54 }}>

                <Card style={{ width: 600 }} className="p-5 shadow-lg p-3 mb-5 bg-white rounded">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        {isLogin ?
                            <div></div>
                            :
                            <div>
                                <Form.Control className="mt-3" placeholder="First Name" type="text" value={firstName} onChange={f => setFirstName(f.target.value)} />
                                <Form.Control className="mt-3" placeholder="Last Name" type="text" value={lastName} onChange={l => setLastName(l.target.value)} />
                                {lastNameError && <span style={{ color: 'red' }}>{lastNameError}</span>}
                            </div>
                        }
                        <Form.Control className="mt-3" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                        <Form.Control className="mt-3" placeholder="Password" type="password" value={password} onChange={p => setPassword(p.target.value)} />
                        {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
                        <Button variant="outline-success" className="w-100 mt-3" onClick={click}>
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                        {isLogin ?
                            <div className="mt-2 text-center">
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} onClick={clearAllData}>Зарегистрироваться</NavLink>
                            </div>
                            :
                            <div className="mt-2 text-center">
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} onClick={clearAllData}>Войти</NavLink>
                            </div>
                        }
                    </Form>
                </Card>
                <ToastContainer />
            </Container>

        </div>
    );
});

export default Auth;