import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../SignUp/Input";

import {Button, Container, Form} from "react-bootstrap";

import { login } from "../../actions/auth";
import { LinkContainer } from "react-router-bootstrap";

import './styles.scss';
import Breadcrumbs from "../Breadcrumbs";

const initialState = {email: '', password: ''};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(formData, navigate));
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <Container>
            <Breadcrumbs currentPage="Вход" />
            <div className="login">
                <div className="wrapper">
                    <div className="h2">Вход</div>
                    <p>С возвращением! Для входа в систему введите свой адрес электронной почты и пароль.</p>
                    <Form onSubmit={handleSubmit}>
                        <Input name="email" label="Электронная почта" type="email" handleChange={handleChange}/>                        
                        <Input name="password" label="Пароль" type="password" handleChange={handleChange}/>
                        <div className="d-flex">
                            <Input name="remember" label="Запомнить меня" type="checkbox"/>
                            <div className="forget">Забыли пароль?</div>
                        </div>
                        <Button className="login-btn" type="submit">Войти</Button>
                        <p className="no-acc">У вас нет аккаунта? <LinkContainer to="/signup"><span>Зарегистрироваться.</span></LinkContainer></p>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;