import React, { useState, useContext } from "react";
import { Context } from "../index";
import { Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrderItem.css";
import OrderDetailModal from "./modals/OrderDetailModal";
import SendEmailModal from "./modals/SendEmailModal";
import OrderStatusChangeModal from "../components/modals/OrderStatusChangeModal";
import AreYouSureModal from "./modals/AreYouSureModal";
import { deleteOrder } from "../http/orderApi";
import { toast } from "react-toastify";

const OrderItem = ({ order, onChangeState }) => {
    const navigate = useNavigate();

    const { user } = useContext(Context);

    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [sendEmailModalOpen, setSendEmailModalOpen] = useState(false);
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [orderStatusChangeModalOpen, setOrderStatusChangeModalOpen] = useState(false);

    const getStatusColor = () => {
        switch (order.status) {
            case 'Новая':
                return 'Blue';
            case 'Одобрен':
                return 'Green';
            case 'Отклонен':
                return 'Red';
            default:
                return 'Grey';
        }
    };

    const handleDeleteApprove = (data) => {
        if (data.choice) {
            deleteOrder(order.id).then(() => {
                onChangeState();
                toast.success("Заявка успешно удалена");
            });
        }
    }

    const openEditStatusModal = () => {
        if (user.isUser) {
            return;
        }
        setOrderStatusChangeModalOpen(true);
    };

    const handleCardClick = () => {
        navigate(`/property/${order.propertyId}`);
    };

    const statusColor = getStatusColor();

    const createdAt = new Date(order.createdAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Col className="w-100">
            <Card className="mb-4 OrderItem">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div onClick={handleCardClick} style={{ verticalAlign: 'middle', width: '20%', textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>{order.property.name}</div>
                        <div style={{ verticalAlign: 'middle', width: '20%', cursor: "pointer" }} onDoubleClick={openEditStatusModal}>Статус заявки: <span style={{ color: statusColor, fontWeight: "bold" }}>{order.status}</span></div>
                        <div style={{ verticalAlign: 'middle', width: '45%' }} onClick={() => setDetailModalOpen(true)}>Телефон для связи: {order.phone} ({order.user.firstName} {order.user.lastName})</div>
                        <div style={{ verticalAlign: 'middle', width: '20%' }} onClick={() => setDetailModalOpen(true)}>{createdAt}</div>
                        {user.isManager && <Button variant="primary" onClick={() => setSendEmailModalOpen(true)}>Ответить</Button>}
                        {user.isUser && <Button variant="danger" onClick={() => setApproveModalOpen(true)}>Удалить</Button>}
                    </div>
                </Card.Body>
                <AreYouSureModal show={approveModalOpen} onHide={() => setApproveModalOpen(false)} actionName="удалить заявку" onEvent={handleDeleteApprove} />
                <OrderDetailModal order={order} show={detailModalOpen} onHide={() => setDetailModalOpen(false)} />
                <OrderStatusChangeModal order={order} show={orderStatusChangeModalOpen} onHide={() => { onChangeState(); setOrderStatusChangeModalOpen(false) }} />
                <SendEmailModal order={order} show={sendEmailModalOpen} managerInfo={user} onHide={() => { onChangeState(); setSendEmailModalOpen(false) }} />
            </Card>
        </Col>
    );
};

export default OrderItem;