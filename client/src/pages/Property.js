import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import { getProperty, deleteProperty } from "../http/propertyApi";
import { Context } from "../index";
import { useParams, useNavigate } from "react-router-dom";
import AreYouSureModal from "../components/modals/AreYouSureModal";
import { SHOP_ROUTE } from "../utils/consts";
import UpdateProperty from "../components/modals/UpdateProperty";
import MakeOrderModal from "../components/modals/MakeOrderModal";
import { ToastContainer } from 'react-toastify';
import { getSpecificOrder } from "../http/orderApi";
import GoogleMap from "../components/GoogleMap";

const Property = () => {
    const navigate = useNavigate();
    const [targetProperty, setTargetProperty] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [isOrderExist, setIsOrderExist] = useState(false);

    const { user, property } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        getSpecificOrder(user.user.id, id).then((data) => setIsOrderExist(data.length > 0));
        retrieveProperty()
    }, [editModalOpen, orderModalOpen]);

    const retrieveProperty = () => {
        getProperty(id).then((data) => setTargetProperty(data));
    }

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleOrderClick = () => {
        setOrderModalOpen(true);
    }

    const handleDeleteAction = (data) => {
        if (data.choice) {
            deleteProperty(id).then(() => { property.refreshPropertyData(); navigate(SHOP_ROUTE) });
        }
    }

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    {targetProperty.img && <Image style={{ width: "300px", height: "300px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }} src={"http://localhost:5000/" + targetProperty.img} />}
                </Col>
                <Col md={8}>
                    <div className="property-details">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 style={{ fontSize: "50px", fontWeight: "bold" }}>{targetProperty.name}</h2>
                            {user.isAdmin &&
                                <div>
                                    <Button variant="danger" onClick={handleDeleteClick} style={{ marginRight: '10px' }}>Удалить</Button>
                                    <Button variant="secondary" onClick={handleEditClick}>Изменить</Button>
                                </div>
                            }
                            {user.isUser &&
                                <div>
                                    <Button variant="secondary" onClick={handleOrderClick} disabled={isOrderExist}>Оставить заявку</Button>
                                    {isOrderExist && <div style={{ color: 'blue' }}>Заявка оставлена</div>}
                                </div>
                            }
                        </div>
                        <div className="property-info">
                            <div style={{ fontSize: "25px", marginTop: "8px" }}>{targetProperty.address}</div>
                            <div style={{ fontSize: "20px" }}>{targetProperty.price} $</div>
                            <div style={{ marginTop: "50px" }}>{targetProperty.description}</div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div style={{ textAlign: "center", height: "600px" }}>
                <div className="mt-4" style={{ display: "inline-block", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}>
                    <GoogleMap address={targetProperty.address} />
                </div>
            </div>

            <UpdateProperty show={editModalOpen} onHide={() => { setEditModalOpen(false); retrieveProperty() }} propertyToEdit={targetProperty} />
            <AreYouSureModal show={deleteModalOpen} onEvent={handleDeleteAction} actionName={'удалить'} onHide={() => setDeleteModalOpen(false)} />
            <MakeOrderModal show={orderModalOpen} onHide={() => setOrderModalOpen(false)} propertyId={id} userId={user.user.id} />
            <ToastContainer position="bottom-right" autoClose={2000} />
        </Container>
    );
};

export default Property;