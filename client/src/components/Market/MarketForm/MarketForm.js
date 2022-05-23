import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import FileBase from 'react-file-base64';

import { createMarketPost } from "../../../actions/market";

import Breadcrumbs from "../../Breadcrumbs";
import Input from "../../SignUp/Input";

import "./styles.scss";
import { useNavigate } from "react-router-dom";

const initialState = {title:'', category: '', model: '', manufactor: '', condition: '', location:'', cost:'', tel: '', whatsapp:'', description: ''};
const categories = ['Автозвук и мультимедиа', 'Автосвет', 'Аксессуары', 'Гаджеты', 'Двигатель и выхлопная система', 'Инструменты', 'Климат', 'Кузов', 'Подвеска', 'Рулевое управление', 'Салон', 'Тормозная система', 'Трансмиссия', 'Шины и диски', 'Электрооборудование', 'Другое'];


const MarketForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [images, setImages] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMarketPost({...formData, imgs: images}));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(!user || !user.result){
            navigate(-1);
        }
    }, [user])

    return (
        <div id="market-form">
            <Container>
                <Breadcrumbs links={[{name:'Магазин', link: '/market'}]} currentPage="Добавить объявление" />
                <h1>Добавить объявление</h1>
                <p>Введите нужную информация о вашем автомобиле</p>

                <Form onSubmit={handleSubmit}>
                    <Row xs={1} md={2} lg={2}>
                        <Col>
                            <Input name="title" label="Название товара" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="category" label="Категория" type="select" options={categories} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="manufactor" label="Производитель" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="condition" label="Состояние" type="select" options={['Новое','Б/У']} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="location" label="Город" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="cost" label="Цена (₸)" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="tel" label="Номер телефона" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="whatsapp" label="Whatsapp номер" type="text" handleChange={handleChange} />
                        </Col>
                    </Row>
                    <Input name="description" label="Рассказ о товаре: состояние, срок службы, причина продажи" type="text" required={false} handleChange={handleChange} />
                    <div className="buttons">
                        <label className="img-picker">
                            <FileBase type="file" id="filePicker" multiple={true}
                                onDone={(data) => {
                                    data.map((img) => {
                                        setImages(prevState => [...prevState, img.base64]);
                                    })
                                }} 
                                />
                            Загрузить фото
                        </label>

                        <Button type="submit" className="submit">Добавить объявление</Button>
                    </div>
                    {images.length>0 && (
                        <div className="selectedImages">
                            {images.map((img, key) => (
                                <div className="image" key={key}>
                                    <Image src={img}/>
                                    <span onClick={(e) => {
                                        e.preventDefault();
                                        setImages(images.filter(item => item != img))
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                                            <path d="M5 5L19 19" stroke="white" strokeWidth="2"/>
                                            <path d="M5 19L19 5" stroke="white" strokeWidth="2"/>
                                        </svg>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Form>
            </Container>
        </div>
    );
};

export default MarketForm;