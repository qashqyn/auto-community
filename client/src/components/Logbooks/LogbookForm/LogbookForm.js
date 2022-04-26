import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createLogbook } from "../../../actions/logbook";
import Breadcrumbs from "../../Breadcrumbs";
import Input from "../../SignUp/Input";

const initialState = {title: '', category: '', message: ''};

const categories = ['Автозвук', 'Аксессуары', 'Видео', 'Визит на сервис', 'Встреча', 'Другое', 'ДТП', 'Заправка', 'Запчасти', 'Колёсные диски', 'Кузовной ремонт', 'Мойка', 'Наблюдение', 'Налоги и пошлины', 'Нарушение ПДД', 'Обкатка', 'Плановое ТО', 'Покатушки', 'Покупка машин', 'Поломка', 'Помощь на дороге', 'Прикол', 'Продажа машин', 'Просто так', 'Путешествие', 'Расходники', 'Рейтинг и продвижение', 'Своими руками', 'Соревнования', 'Стайлинг', 'Страхование', 'Тест-драйв', 'Техосмотр', 'Тюнинг', 'Фотография', 'Шины', 'Эвакуация', 'Электроника'];

const LogbookForm = () => {
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState(initialState);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(formData.category !== 'Категория')
            dispatch(createLogbook(formData));
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleEditable = (e) => {
        setFormData({...formData, message: e.target.innerHTML});
    }

    return (
        <div id="logbookForm">
            <Container>
                <Breadcrumbs links={[{name:'Бортжурнал', link: '/logbook'}]} currentPage="Добавить объявление" />
                <h1>Добавить объявление</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Input name="title" label="Заголовок объявлении" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="category" label="Категория" type="select" options={categories} handleChange={handleChange} />
                        </Col>
                    </Row>
                    <Input name="message" label="Текст записи" type="editable" handleChange={handleEditable} maxCharacters={2500} />
                    <Button type="submit" className="submit">Опубликовать</Button>
                </Form>
            </Container>
        </div>
    );
};

export default LogbookForm;