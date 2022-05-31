import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import decode from 'jwt-decode';
import { Button, Container, Form } from "react-bootstrap";
import Input from "../../SignUp/Input";
import Breadcrumbs from "../../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../actions/auth";

import './styles.scss';

const initialState = {passwordCheck: '', password: ''};

const Reset = () => {
    const { token } = useParams();
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);
    const [ errors, setErrors ] = useState(initialState);
    const { status } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errCount = 0;
        if(formData.passwordCheck){
            if(formData.passwordCheck !== formData.password){
                errCount++;
                setErrors({...errors, passwordCheck: 'Пароли не совподают'});
            }
        }else{
            errCount++;
            setErrors({...errors, passwordCheck: 'Введите пароль заново'});
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

        

        if(errCount === 0){
            dispatch(changePassword({...formData, token: token}));

        }
    }
    useEffect(()=>{
        if(status){
            console.log(status);
            switch(status){
                case 201:
                    navigate('/login');
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

    useEffect(() => {
        try {
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > new Date().getTime()){
                    setValid(true);
                }else{
                    setValid(false);
                }
            }
        } catch (error) {
            setValid(false);
        }
    }, [token])

    return (
        <>
            {valid ? (
                <Container>
                    <Breadcrumbs currentPage="Сброс пароля" />
                    <div className="reset">
                        <div className="wrapper">
                            <div className="h2">Создать новый пароль</div>
                            <p>Ваш новый пароль должен отличаться от ранее использовавшихся паролей.</p>
                            <Form onSubmit={handleSubmit}>
                                <Input name="password" label="Введите новый пароль" type="password" error={errors.password} handleChange={handleChange}/>
                                <Input name="passwordCheck" label="Введите пароль заново" type="password" error={errors.passwordCheck} handleChange={handleChange}/>
                                <Button className="login-btn" type="submit">Сброс пароля</Button>
                            </Form>
                        </div>
                    </div>
                </Container>
            ) : navigate(-1)}
        </>
    );
};

export default Reset;