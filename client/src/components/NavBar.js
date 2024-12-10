import React, { useContext } from 'react';
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, MANAGER_ROUTE, ORDER_ROUTE } from "../utils/consts";
import Container from "react-bootstrap/Container";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleAdminPage = () => {
        navigate(ADMIN_ROUTE);
    }

    const handleManagerPage = () => {
        navigate(MANAGER_ROUTE);
    }

    const handleLogIn = () => {
        navigate(LOGIN_ROUTE);
    }

    const handleOrderPage = () => {
        navigate(ORDER_ROUTE);
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        navigate(SHOP_ROUTE);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>Империум Недвижимости</NavLink>
                {user.isAuth ?

                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                            {user.firstName} {user.lastName}
                        </div>
                        {user.isAdmin && <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={handleAdminPage}>Админ панель</Button>}
                        {user.isManager && <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={handleManagerPage}>Менеджер панель</Button>}
                        {user.isUser && <Button style={{ marginRight: '10px' }} variant="outline-light" onClick={handleOrderPage}>Мои заявки</Button>}
                        <Button variant="outline-light" onClick={handleLogOut}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant="outline-light" onClick={handleLogIn}>Войти</Button>
                    </Nav>
                }
            </Container>
        </Navbar >
    );
});

export default NavBar;