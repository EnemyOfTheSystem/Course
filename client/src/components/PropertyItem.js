import React from "react";
import { Image, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PropertyItem = ({ property }) => {

    console.log(JSON.stringify(property));

    const navigate = useNavigate();

    const handleElementClick = () => {
        navigate('/property/' + property.id);
    }

    return (
        <Col md={4} className="mt-3" >
            <Card onClick={handleElementClick} style={{ width: 300, cursor: 'pointer', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '10px', padding: '10px' }} border={"light"}>
                <Image style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} src={'http://localhost:5000/' + property.img} />
                <div className="mt-1 align-items-center">
                    <div className="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{property.name}</div>
                        <div className="bold-text">{property.price} $</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#777' }}>{property.propertyPaymentTerm?.name}</div>
                    <div style={{ fontSize: '14px', color: '#777' }}>{property.address}</div>
                </div>
            </Card>
        </Col>
    );
};

export default PropertyItem;