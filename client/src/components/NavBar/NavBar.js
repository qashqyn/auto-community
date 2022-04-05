import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';


import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actionType from '../../constants/actionTypes';

import './style.css';

const NavBar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const isMainPage = pathname === '/' ? true : false;
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
        navigate('/auth');
    
        setUser(null);
      };
    

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }
      
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <Navbar collapseOnSelect className={`${isMainPage ? "mainPage" : ""}`}>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Auto Community</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="m-auto">
                        <LinkContainer to="/antitheft">
                            <Nav.Link>Антиугон</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/news">
                            <Nav.Link>Новости</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/logbook">
                            <Nav.Link>Бортжурнал</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/video">
                            <Nav.Link>Видео</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/market">
                            <Nav.Link>Магазин</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {user?.result ? (
                            <>
                                <LinkContainer to="">
                                    <Nav.Link><FontAwesomeIcon icon={['far', 'bell']} /></Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/profile">
                                    <Nav.Link><FontAwesomeIcon icon={['far', 'user']} /></Nav.Link>
                                </LinkContainer>
                            </>
                        ) : (         
                            <LinkContainer to="/login">
                                <Button>Войти</Button>
                            </LinkContainer>               
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

