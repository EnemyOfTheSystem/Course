import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Context } from "../index";
import { ToastContainer } from 'react-toastify';
import OrderItem from "../components/OrderItem";


const Manager = () => {

    const { order } = useContext(Context);

    useEffect(() => {
        handleDataRefresh();
    }, [])

    const handleDataRefresh = () => {
        console.log("refresh");
        order.refreshOrderData();
    }



    return (
        <Container>
            <div className="mt-3" >
                <h1 style={{ textAlign: "center" }}>Панель менеджера</h1>
                <p style={{ textIndent: "30px", textAlign: "justify" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>Инструкция по работе с клиентами: </span>
                    На странице менеджера отображаются все заявки, которые были оставлены пользователями.
                    Менеджер может изучить комментарии с клиентом, при необходимости может связаться с клиентом по телефону.
                    После выяснения всех деталей, менеджер может нажать на кнопку "Ответить", после чего будет предложено настроить e-mail сообщение для клиента.
                    После нажатия на кнопку "Отправить", клиенту придет письмо с ответом на его заявку.
                </p>
                <div className="mt-4">
                    {order.orders.map((order) =>
                        <OrderItem key={order.id} order={order} onChangeState={handleDataRefresh} />
                    )}
                </div>

            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </Container>
    );
};

export default Manager;