import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { Container } from "react-bootstrap";
import OrderItem from "../components/OrderItem";
import { getUserOrders } from "../http/orderApi";
import { ToastContainer } from 'react-toastify';

const Order = () => {

    const { user } = useContext(Context);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        refreshOrders();
    }, [])

    const refreshOrders = () => {
        getUserOrders(user.user.id).then(data => {
            setUserOrders(data);
        })
    }

    return (
        <Container>
            <h1 className="mt-3" style={{ textAlign: "center", textShadow: "1px 1px 1px #000000" }}>
                Список всех заявок, которые вы оставляли
            </h1>
            <div className="mt-4">
                {userOrders.length === 0 && <h3 style={{ textAlign: "center", color: "grey" }}>Вы пока не оставляли заявок...</h3>}
                {userOrders.map((order) => (
                    <OrderItem key={order.id} order={order} onChangeState={refreshOrders} />
                ))}
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </Container>
    );
};

export default Order;