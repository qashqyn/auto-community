import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {Button, Card, Container, Form} from "react-bootstrap";
import Input from "./Input";

import { signup } from "../../actions/auth";

const initialState = {firstname: '', lastname: '', email: '', password: '', tel: '', country: '', city: '', car: ''};

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signup(formData, navigate));
    }
    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Input name="email" label="Электронная почта" type="email" handleChange={handleChange}/>                        
                        <Input name="password" label="Пароль" type="password" handleChange={handleChange}/>                        
                        <Input name="firstname" label="Имя" type="text" handleChange={handleChange}/>                        
                        <Input name="lastname" label="Фамиля" type="text" handleChange={handleChange}/>                        
                        <Input name="tel" label="Телефон" type="text" handleChange={handleChange}/>                        
                        <Input name="country" label="Страна" type="text" handleChange={handleChange}/>                        
                        <Input name="city" label="Город" type="text" handleChange={handleChange}/>                        
                        <Input name="car" label="Машина" type="text" handleChange={handleChange}/>                        
                        <Button type="submit">Создать аккаунт</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SignUp;