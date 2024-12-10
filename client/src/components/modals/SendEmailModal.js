import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { sendEmail } from '../../http/emailApi';
import { toast } from 'react-toastify';
import { updateOrder } from '../../http/orderApi';

const SendEmailModal = ({ show, onHide, order, managerInfo }) => {

    const EMAIl_TEMPLATE_MESSAGE = `Здравствуйте, ${order.user.firstName}!

    Мы заметили ваш интерес к данной недвижимости и рады сообщить, что мы готовы предоставить вам договор о аренде. Ниже приведены детали:

    Название недвижимости: ${order.property.name}
    Цена: ${order.property.price} $
    Адрес: ${order.property.address}

    Если вы желаете получить дополнительную информацию о договоре аренды или имеете вопросы, пожалуйста, свяжитесь с нами в удобное для вас время.

    Благодарим вас за проявленный интерес.

    С уважением, ${managerInfo.firstName} ${managerInfo.lastName}
    Команда по аренде недвижимости`;

    const [recipient, setRecipient] = useState(order.user.email);
    const [subject, setSubject] = useState(order.property.name);
    const [message, setMessage] = useState(EMAIl_TEMPLATE_MESSAGE);
    const [attachFile, setAttachFile] = useState(false);

    const send = () => {
        const data = {
            to: recipient,
            subject,
            emailBody: message,
            attachFile
        };

        sendEmail(data).then(async (data) => {
            if (data.status === 'success') {
                toast.success('E-mail успешно отправлен');
                await updateOrder({ id: order.id, status: 'В обработке' });
                close();
            } else {
                toast.success('Ошибка при отправке e-mail, обратитесь к администратору');
                close();
            }
        });

    };

    const clearForm = () => {
        setRecipient(order.user.email);
        setSubject(order.property.name);
        setMessage(EMAIl_TEMPLATE_MESSAGE);
        setAttachFile(false);
    };

    const close = () => {
        clearForm();
        onHide();
    }


    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Отправка e-mail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <div className="d-flex mt-2 justify-content-between align-items-center">
                            <div>От кого:</div>
                            <Form.Control style={{ width: '85%' }} type="text" value={"orgfortesting@gmail.com"} disabled />
                        </div>
                        <div className="d-flex mt-2 justify-content-between align-items-center">
                            <div>Кому:</div>
                            <Form.Control style={{ width: '85%' }} type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} disabled />
                        </div>
                        <div className="d-flex mt-2 justify-content-between align-items-center">
                            <div>Тема:</div>
                            <Form.Control style={{ width: '85%' }} type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <Form.Control className='mt-2' as="textarea" rows={20} value={message} onChange={(e) => setMessage(e.target.value)} />
                        <div className="d-flex mt-2 justify-content-end">
                            <div style={{ marginRight: '10px' }}>Прикрепить файл с договором: </div>
                            <Form.Check type="checkbox" checked={attachFile} onChange={(e) => setAttachFile(e.target.checked)} />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={close}>Отмена</Button>
                <Button variant="outline-primary" onClick={send}>Отправить</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default SendEmailModal;