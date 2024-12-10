import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { property } = useContext(Context);
    return (
        <Row className="d-flex mt-2">
            <div style={{ fontWeight: 'bold', fontSize: '16px', textAlign: "center" }}>Тип недвижимости</div>
            <ListGroup>
                {property.propertyTypes.map(type =>
                    <ListGroup.Item key={type.id}
                        style={{ cursor: 'pointer' }}
                        active={type.id === property.selectedType}
                        onClick={() => property.setSelectedType(type.id)}>
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Row>
    );
});

export default TypeBar;