import React, {useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../SignUp/Input";

import {Button, Container, Form} from "react-bootstrap";

import { login } from "../../actions/auth";
import { LinkContainer } from "react-router-bootstrap";

import './styles.scss';
import Breadcrumbs from "../Breadcrumbs";
import PassResetModal from "./PassResetModal";

const initialState = {email: '', password: ''};
const errorsInitialState = {email: '', password: ''};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);
    const [ errors, setErrors ] = useState(errorsInitialState);
    const { status } = useSelector((state) => state.auth);

    const [openReset, setOpenReset] = useState(false);


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
            if(formData.password.length < 8){
                errCount++;
                setErrors({...errors, password: 'Пароль должен быть не менее 8 символов в длинну'});
            }
            if(formData.password.length > 20){
                errCount++;
                setErrors({...errors, password: 'Пароль должен быть не более 20 символов в длинну'});
            }
        }else{
            errCount++;
            setErrors({...errors, password: 'Введите ваш пароль'});
        }
        if(errCount === 0)
            dispatch(login(formData));

    }
    useEffect(()=>{
        if(status){
            console.log(status);
            switch(status){
                case 200:
                    navigate(-1);
                    break;
                case 400:
                case 404:
                    setErrors({...errors, main: 'Электронная почта или пароль не распознаны.<br>Повторите попытку или восстановите пароль.'})
                    break;
                case 500:
                    setErrors({...errors, main: `Что-то пошло не так.<br>Пожалуйста, попробуйте позже.`})
                    break;
            }
        }
    }, [status])
    const handleChange = (e) => {
        setErrors({...errors, [e.target.name]: ''});
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const resetPass = (e) =>{
        e.preventDefault();
        setOpenReset(true);
    }
    const closeResetPass = (e) => {
        e.preventDefault()
        console.log(e.target);
        // setOpenReset(false);
    }
    return (
        <Container>
            <PassResetModal show={openReset} setShow={setOpenReset} />
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
                            <div className="forget" onClick={resetPass}>Забыли пароль?</div>
                        </div>
                        <Form.Control isInvalid={errors.main} hidden />
                        <Form.Control.Feedback dangerouslySetInnerHTML={{ __html: errors.main }} type="invalid"></Form.Control.Feedback>
                        <Button className="login-btn" type="submit">Войти</Button>
                        <p className="no-acc">У вас нет аккаунта? <LinkContainer to="/signup"><span>Зарегистрироваться.</span></LinkContainer></p>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;