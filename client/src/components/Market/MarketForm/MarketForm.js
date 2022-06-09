import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FileBase from 'react-file-base64';

import { createMarketPost } from "../../../actions/market";

import Breadcrumbs from "../../Breadcrumbs";
import Input from "../../SignUp/Input";

import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { getCars } from "../../../actions/carModels";

const initialState = {title:'', category: '', model: '', manufactor: '', condition: '', location:'', cost:'', tel: '', whatsapp:'', description: ''};
const categories = ['Автозвук и мультимедиа', 'Автосвет', 'Аксессуары', 'Гаджеты', 'Двигатель и выхлопная система', 'Инструменты', 'Климат', 'Кузов', 'Подвеска', 'Рулевое управление', 'Салон', 'Тормозная система', 'Трансмиссия', 'Шины и диски', 'Электрооборудование', 'Другое'];


const MarketForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [images, setImages] = useState([]);
    const user = JSON.parse(localStorage.getItem('profile'));

    const {carModels, status} = useSelector((state) => state.posts);    
    const [marks, setMarks] = useState([]);
    const [models, setModels] = useState([]);
    const [generations, setGenerations] = useState([]);
    const [addCar, setAddCar] = useState({mark: '',model: '',generation: ''});

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

        if(addCar.mark.length > 0 && addCar.model.length > 0 && addCar.generation.length > 0){
            const suits = carModels[addCar.mark].mark + " " + carModels[addCar.mark].models[addCar.model].name + " " + carModels[addCar.mark].models[addCar.model].generations[addCar.generation];
            dispatch(createMarketPost({...formData, imgs: images, suits}));
        }
    }

    const handleChange = (e) => {

        if(e.target.name.includes("suits_")){
            const name = e.target.name.split('_')[1];
            const value = e.target.value;
            switch(name){
                case 'mark':
                    let modells = [];
                    if(value){
                        carModels[value].models.map((model) => {
                            modells.push(model.name);
                        })
                    }
                    setModels(modells);
                    setGenerations([]);
                    setAddCar({mark: value, model: '',generation: ''});
                    break;
                case 'model':
                    let gens = [];
                    carModels[addCar.mark].models[value].generations.map((gen)=>{
                        gens.push(gen);
                    })
                    setGenerations(gens);
                    setAddCar({...addCar, model: value, generation: ''});
                    break;
                case 'generation':
                    setAddCar({...addCar, generation: value});
                    break;
            }
        }else{
            setFormData({...formData, [e.target.name]: e.target.value});
        }

    }

    useEffect(() => {
        dispatch(getCars());
    }, [dispatch]);

    useEffect(() => {
        if(!user || !user.result){
            navigate(-1);
        }
    }, [user]);


    const [statusModal, setStatusModal] = useState(false);
    const [statusModalText, setStatusModalText] = useState({title: '', text: ''});
    useEffect(() => {
        console.log(status);
        if(status){
            switch(status){
                case 200:
                case 201:
                    setStatusModalText({title: 'Успех', text: 'Товар успешно добавлен.'})
                    break;
                default:      
                    setStatusModalText({title: 'Ошибка', text: 'Что-то пошло не так. Пожалуйста попробуйте позже.'})
                    break;
            }
            setStatusModal(true);
        }
    }, [status]);


    const closeStatusModal = () => {
        switch(status){
            case 200:
            case 201:
                setFormData(initialState);
                setAddCar({mark: '',model: '',generation: ''});
                break; 
        }
        setStatusModal(false);
    }

    return (
        <div id="market-form">
            <Modal show={statusModal} onHide={closeStatusModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{statusModalText.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{statusModalText.text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeStatusModal} >OK</Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Breadcrumbs links={[{name:'Магазин', link: '/market'}]} currentPage="Добавить объявление" />
                <h1>Добавить объявление</h1>
                <p>Введите нужную информация о вашем автомобиле</p>

                <Form onSubmit={handleSubmit}>
                    <Row xs={1} md={2} lg={2}>
                        <Col>
                            <Input name="title" label="Название товара" type="text" value={formData.title} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="category" label="Категория" type="select" value={formData.category} options={categories} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="manufactor" label="Производитель" type="text" value={formData.manufactor} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="condition" label="Состояние" type="select" value={formData.condition} options={['Новое','Б/У']} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="location" label="Город" type="text" value={formData.location} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="cost" label="Цена (₸)" type="currency" value={formData.cost} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="tel" label="Номер телефона" type="tel" value={formData.tel} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="whatsapp" label="Whatsapp номер" type="tel" value={formData.whatsapp} handleChange={handleChange} />
                        </Col>
                    </Row>
                    <Input name="description" label="Рассказ о товаре: состояние, срок службы, причина продажи" value={formData.description} type="text" required={false} handleChange={handleChange} />
                    
                    <h3>Подходит для</h3>
                    <Row xs={1} lg={3}>
                        <Col>
                            <Input name="suits_mark" label="Марка" type="select" keyAsValue={true} options={marks} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="suits_model" label="Модель" type="select" keyAsValue={true} options={models} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="suits_generation" label="Поколение" type="select" keyAsValue={true} options={generations} handleChange={handleChange} />
                        </Col>
                    </Row>
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