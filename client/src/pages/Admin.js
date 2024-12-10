import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CreateProperty from "../components/modals/CreateProperty";
import CreatePropertyType from "../components/modals/CreatePropertyType";
import CreateManager from "../components/modals/CreateManager";
import CreateReport from "../components/modals/CreateReport";
import { ToastContainer } from 'react-toastify';
import { Context } from "../index";
import OrderItem from "../components/OrderItem";

const Admin = () => {
    const { order } = useContext(Context);
    const [propertyVisible, setPropertyVisible] = useState(false)
    const [propertyTypeVisible, setPropertyTypeVisible] = useState(false)
    const [managerVisible, setManagerVisible] = useState(false)
    const [reportVisible, setReportVisible] = useState(false)

    useEffect(() => {
        order.refreshOrderData()
    }, [])

    return (
        <Container>
            <div className="mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant={"outline-dark"} style={{ marginRight: '10px' }} onClick={() => setPropertyVisible(true)}>Добавить недвижемость</Button>
                <Button variant={"outline-dark"} style={{ marginRight: '10px' }} onClick={() => setPropertyTypeVisible(true)}>Добавить тип недвижемости</Button>
                <Button variant={"outline-dark"} onClick={() => setManagerVisible(true)}>Добавить менеджера</Button>
                <Button variant={"outline-dark"} style={{ marginLeft: '10px' }} onClick={() => setReportVisible(true)}>Выгрузить отчет о заявках</Button>
            </div>
            <div className="mt-3" >
                <div className="mt-3" >
                    {order.orders.map((order) =>
                        <OrderItem key={order.id} order={order} isAdminPage={true} onChangeState={() => { }} />
                    )}
                </div>
            </div>

            <CreateProperty show={propertyVisible} onHide={() => setPropertyVisible(false)} />
            <CreatePropertyType show={propertyTypeVisible} onHide={() => setPropertyTypeVisible(false)} />
            <CreateManager show={managerVisible} onHide={() => setManagerVisible(false)} />
            <CreateReport show={reportVisible} onHide={() => setReportVisible(false)} />
            <ToastContainer position="bottom-right" autoClose={2000} />
        </Container>
    );
};

export default Admin;