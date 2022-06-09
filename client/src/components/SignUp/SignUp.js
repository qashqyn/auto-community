import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {Button, Card, Container, Form} from "react-bootstrap";
import Input from "./Input";
import Breadcrumbs from '../Breadcrumbs';

import { signup } from "../../actions/auth";
import './signup.scss';
import { LinkContainer } from "react-router-bootstrap";
import { getCars } from "../../actions/carModels";

const initialState = {firstname: '', lastname: '', email: '', password: '', tel: '', country: '', city: '', car: ''};

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);

    const {carModels} = useSelector((state) => state.posts);

    const [marks, setMarks] = useState([]);

    useEffect(()=>{
        dispatch(getCars());
    }, [dispatch]);

    useEffect(()=>{
        if(carModels){
            let markss = [];
            carModels.map((car) => {
                markss.push(car.mark);
            })
            setMarks(markss);
        }
    }, [carModels]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signup(formData, navigate));
    }
    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <div className="signup">
            <div className="image"></div>        
            <Container>
                <div className="form">
                    <Breadcrumbs links={[{name:'Вход', link: '/login'}]} currentPage="Регистрация" />

                    <div className="h2">Создать учетную запись</div>
                    <p>Заполните основную информацию о себе.</p>
                    <Form onSubmit={handleSubmit}>
                        <Input name="email" label="Электронная почта" type="email" handleChange={handleChange}/>                        
                        <Input name="password" label="Пароль" type="password" handleChange={handleChange}/>                        
                        <Input name="firstname" label="Имя" type="text" handleChange={handleChange}/>                        
                        <Input name="lastname" label="Фамиля" type="text" handleChange={handleChange}/>                        
                        <Input name="tel" label="Телефон" type="text" handleChange={handleChange}/>                        
                        <Input name="country" label="Страна" type="text" handleChange={handleChange}/>                        
                        <Input name="city" label="Город" type="text" handleChange={handleChange}/>                        
                        <Input name="mark" label="У меня нет машины" options={marks} keyAsValue={true} type="select" handleChange={handleChange}/>                        
                        <div className="d-flex politic-wrap">
                            <Input name="politic" label="Я прочитал(-а) и принимаю" type="checkbox" required/>                        
                            &nbsp;
                            <LinkContainer to='/politic'>
                                <span className="politic">Политику конфиденциальности.</span>
                            </LinkContainer>
                        </div>
                        <Button className="signup-btn" type="submit">Создать аккаунт</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default SignUp;