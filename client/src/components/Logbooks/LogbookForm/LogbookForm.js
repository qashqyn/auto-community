import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLogbook } from "../../../actions/logbook";
import { CLEAR_STATE } from "../../../constants/actionTypes";
import Breadcrumbs from "../../Breadcrumbs";
import Input from "../../SignUp/Input";

import './styles.scss';

const initialState = {title: '', category: '', message: ''};

const categories = ['Автозвук', 'Аксессуары', 'Видео', 'Визит на сервис', 'Встреча', 'Другое', 'ДТП', 'Заправка', 'Запчасти', 'Колёсные диски', 'Кузовной ремонт', 'Мойка', 'Наблюдение', 'Налоги и пошлины', 'Нарушение ПДД', 'Обкатка', 'Плановое ТО', 'Покатушки', 'Покупка машин', 'Поломка', 'Помощь на дороге', 'Прикол', 'Продажа машин', 'Просто так', 'Путешествие', 'Расходники', 'Рейтинг и продвижение', 'Своими руками', 'Соревнования', 'Стайлинг', 'Страхование', 'Тест-драйв', 'Техосмотр', 'Тюнинг', 'Фотография', 'Шины', 'Эвакуация', 'Электроника'];

const LogbookForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState(initialState);
    const [ formError, setFormError ] = useState(initialState);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const {status} = useSelector((state) => state.posts);

    const handleSubmit = (e) =>{
        e.preventDefault();
        let errCnt = 0;
        let errs = {};
        if(formData.title.length === 0){
            errCnt++;
            errs.title = 'Заполните поле';
        }
        if(formData.category.length === 0){
            errCnt++;
            errs.category = 'Выберите категорию';

        }
        if(formData.message.length === 0){
            errCnt++;
            errs.message = 'Заполните поле';
        }
        setFormError(errs);
        if(errCnt === 0){
            dispatch(createLogbook(formData));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setFormError({...formError, [e.target.name]: ''});
    }
    const handleEditable = (e) => {
        setFormData({...formData, message: e.target.innerHTML});
        setFormError({...formError, message: ''});
    }

    useEffect(() => {
        if(!user || !user.result){
            navigate(-1);
        }
    }, [user])

    const [statusModal, setStatusModal] = useState(false);
    const [statusModalText, setStatusModalText] = useState({title: '', text: ''});
    useEffect(() => {
        if(status){
            switch(status){
                case 200:
                case 201:
                    setStatusModalText({title: 'Успех', text: 'Пост успешно создан.'})
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
                dispatch({type: CLEAR_STATE});
                break; 
        }
        setStatusModal(false);
    }

    return (
        <div id="logbookForm">
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
                <Breadcrumbs links={[{name:'Бортжурнал', link: '/logbook'}]} currentPage="Добавить объявление" />
                <h1>Добавить объявление</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Input name="title" label="Заголовок объявлении" error={formError.title} type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="category" label="Категория" type="select" error={formError.category} options={categories} handleChange={handleChange} />
                        </Col>
                    </Row>
                    <Input name="message" label="Текст записи" type="editable" error={formError.message} handleChange={handleEditable} maxCharacters={2500} />
                    <div className="d-flex">
                        <Button type="submit" className="submit">Опубликовать</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default LogbookForm;