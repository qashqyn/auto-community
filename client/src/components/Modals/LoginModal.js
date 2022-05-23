import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './login.scss';

const LoginModal = ({show, setShow, text}) => {
    const close = () => {
        setShow(false);
    }

    return(
        <Modal id="login-modal" show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Вы не авторизованы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Row xs={2}>
                    <Col>
                        <LinkContainer to="/login">
                            <Button className="login">Войти</Button>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to="/signup">
                            <Button className="register">Зарегистрироваться</Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
};

export default LoginModal;