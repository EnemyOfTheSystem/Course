import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";


const AreYouSureModal = ({ show, onHide, actionName, onEvent }) => {

    const handleYes = () => {
        const data = {
            action: actionName,
            choice: true
        };
        onEvent(data);
        onHide();
    };

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Вы уверены, что хотите {actionName}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleYes}>Да</Button>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default AreYouSureModal;