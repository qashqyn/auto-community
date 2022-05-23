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
const errorsInitialState = {email: '', password: ''};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);
    const [ errors, setErrors ] = useState(errorsInitialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errCount = 0;

        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if(formData.email){
            if(regex.test(formData.email)){
                setErrors({...errors, email: ''});
            }else{
                errCount++;
                setErrors({...errors, email: 'Напишите правильную почту'});
            }
        }else{
            errCount++;
            setErrors({...errors, email: 'Введите вашу электронную почту'});

        }
        if(formData.password){
            if(formData.password.length < 8)
                setErrors({...errors, password: 'Пароль должен быть не менее 8 символов в длинну'});
            if(formData.password.length > 20)
                setErrors({...errors, password: 'Пароль должен быть не более 20 символов в длинну'});

        }else{
            errCount++;
            setErrors({...errors, password: 'Введите ваш пароль'});
        }
        if(errCount === 0)
            dispatch(login(formData, navigate));

    }
    const handleChange = (e) => {
        setErrors({...errors, [e.target.name]: ''});
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
                        <Input name="email" label="Электронная почта" type="text" error={errors.email} handleChange={handleChange}/>                        
                        <Input name="password" label="Пароль" type="password" error={errors.password} handleChange={handleChange}/>
                        <div className="d-flex">
                            <Input name="remember" label="Запомнить меня" required={false} type="checkbox"/>
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