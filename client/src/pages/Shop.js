import React, { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import TypeBar from "../components/TypeBar";
import CostBar from "../components/CostBar";
import { Context } from "../index";
import { Button, Col, Container, Row } from "react-bootstrap";
import PaymentTermBar from "../components/PaymentTermBar";
import PropertyList from "../components/PropertyList";
import { Input } from '@mui/material';

const Shop = () => {

    const { property } = useContext(Context);

    const refreshData = () => {
        property.refreshPropertyData();
    }

    useEffect(() => {

    }, []);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <div className="mt-4" style={{ fontWeight: 'bold', fontSize: '16px', textAlign: "center", textDecoration: "underline" }}>Фильтр</div>
                    <TypeBar />
                    <PaymentTermBar />
                    <CostBar />
                    <div style={{ textAlign: "center" }}>
                        <Button className="mt-4" onClick={refreshData}>Применить</Button>
                    </div>
                </Col>
                <Col md={9}>
                    <div style={{ textAlign: "left" }}>
                        <Input style={{ width: "100%" }} className="mt-4" placeholder="Поиск по названию" onChange={(e) => property.setSearchWord(e.target.value)} />
                    </div>
                    <PropertyList />
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Shop;