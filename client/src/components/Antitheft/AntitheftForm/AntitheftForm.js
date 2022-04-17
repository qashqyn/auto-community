import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import FileBase from 'react-file-base64';

import { createAntitheftPost } from "../../../actions/antitheft";

import Breadcrumbs from "../../Breadcrumbs";
import Input from "../../SignUp/Input";

import "./styles.scss";

const initialState = {mark:'', stateNumber:'', model: '', vin: '', color: '', thiftDate:'', releaseYear:'', location: '', amount:'', ownerNumber: '', specialMarks:''};

const AntitheftForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAntitheftPost({...formData, selectedFiles: images}));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div id="antitheft-form">
            <Container>
                <Breadcrumbs links={[{name:'Антиугон', link: '/antitheft'}]} currentPage="Подать объявление" />
                <h1>Подать объявление</h1>
                <p>Введите нужную информация о вашем автомобиле</p>

                <Form onSubmit={handleSubmit}>
                    <Row xs={1} md={2} lg={2}>
                        <Col>
                            <Input name="mark" label="Марка" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="stateNumber" label="Гос номер" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="model" label="Модель" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="vin" label="VIN - номер" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="color" label="Цвет" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="thiftDate" label="Дата кражи" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="releaseYear" label="Год выпуска" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="location" label="Место кражи" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="amount" label="Сумма вознаграждение в ₸" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="ownerNumber" label="Номер владельца" type="tel" handleChange={handleChange} />
                        </Col>
                    </Row>
                    <Input name="specialMarks" label="Особые отметки Вашего автомобиля (например: вмятина на капоте)" type="text" required={false} handleChange={handleChange} />
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

                        <Button type="submit" className="submit">Подать объявление</Button>
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

export default AntitheftForm;