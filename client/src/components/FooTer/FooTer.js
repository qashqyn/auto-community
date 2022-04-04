import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

const FooTer = () => {
    const user = null;

    return (
        <div className="footer">
            <Container>
                <Row lg={4}>
                    <Col>
                        <LinkContainer to="/"><h3>AutoCommunity</h3></LinkContainer>
                        <div className="subtitle">Автосообщество нового формата</div>
                    </Col>
                    <Col>
                        <h3>Информация</h3>
                        <ul>
                            <LinkContainer to="/antitheft"><li>Антиугон</li></LinkContainer>
                            <LinkContainer to="/logbook"><li>Бортжурнал</li></LinkContainer>
                            <LinkContainer to="/news"><li>Новости</li></LinkContainer>
                        </ul>
                    </Col>
                    <Col>
                        <h3>Контакты</h3>
                        <ul>
                            <li><a href="tel:+ 702 (122) 56 87">+ 702 (122) 56 87</a></li>
                            <li><a href="mailto:info@gmai.com">info@gmai.com</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h3>Поддержка</h3>
                        <ul>
                            <LinkContainer to="/help"><li>Помощь</li></LinkContainer>
                            <LinkContainer to="/confidentiality"><li>Конфиденциальность</li></LinkContainer>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <div className="c">© 2022 Auto Community. Все права защищены.</div>
            </Container>
        </div>
    );
}

export default FooTer;