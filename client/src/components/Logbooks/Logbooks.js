import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';

import LogbookCard from './LogbookCard/LogbookCard';
import {getLogbooks, getLogbooksByCategory} from '../../actions/logbook';

import './styles.scss';
import { LinkContainer } from 'react-router-bootstrap';
import Input from '../SignUp/Input';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const markOptions = ['AC Cobra'];

const categories = ['Автозвук', 'Аксессуары', 'Видео', 'Визит на сервис', 'Встреча', 'Другое', 'ДТП', 'Заправка', 'Запчасти', 'Колёсные диски', 'Кузовной ремонт', 'Мойка', 'Наблюдение', 'Налоги и пошлины', 'Нарушение ПДД', 'Обкатка', 'Плановое ТО', 'Покатушки', 'Покупка машин', 'Поломка', 'Помощь на дороге', 'Прикол', 'Продажа машин', 'Просто так', 'Путешествие', 'Расходники', 'Рейтинг и продвижение', 'Своими руками', 'Соревнования', 'Стайлинг', 'Страхование', 'Тест-драйв', 'Техосмотр', 'Тюнинг', 'Фотография', 'Шины', 'Эвакуация', 'Электроника'];

const Logbooks = () => {
    const { posts: logbooks, isLoading } = useSelector((state) => state.posts);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const dispatch = useDispatch();

    const query = useQuery();

    useEffect(() => {
        if(selectedCategories.length > 0)
            dispatch(getLogbooksByCategory(selectedCategories));
        else
            dispatch(getLogbooks());
    }, [dispatch, selectedCategories]);

    const addCategory = (e) => {
        if(!selectedCategories.includes(e.target.id) && e.target.checked){
            setSelectedCategories([...selectedCategories, e.target.id]);
        }else if(selectedCategories.includes(e.target.id) && !e.target.checked){
            setSelectedCategories(selectedCategories.filter(item => item != e.target.id));
        }
    }

    const handleCar = (e) => {
        e.preventDefault();
        console.log(e.target.name + " " + e.target.value);
    }

    return (
        <Container>
            <Breadcrumbs currentPage="Бортжурнал" />
                <h1>Бортжурнал</h1>
            <div className="top">
                <div>
                    search
                </div>
                <LinkContainer to="/logbook/form">
                    <Button>Добавить объявление</Button>
                </LinkContainer>
            </div>

            <Row>
                <Col md={3}>
                    <div className='car-filter'>
                        <h3>Машина</h3>
                        <Input type="select" name="mark" handleChange={handleCar} label="Все марки" options={markOptions} required={false} /> 
                        <Input type="select" name="model" handleChange={handleCar} label="Все модели" options={markOptions} required={false} /> 
                        <Input type="select" name="seri" handleChange={handleCar} label="Все поколения" options={markOptions} required={false} /> 
                        <Input type="select" name="engine" handleChange={handleCar} label="Двигатель" options={markOptions} required={false} /> 
                        <Input type="select" name="transmission" handleChange={handleCar} label="Трансмиссия" options={markOptions} required={false} /> 
                        <Input type="select" name="drive" handleChange={handleCar} label="Привод" options={markOptions} required={false} /> 
                    </div>
                    <div className="category-filter">
                        <h3>Категории</h3>
                        {categories.map((category, key) => (
                            <Input key={key} type="checkbox" name={category} label={category} handleChange={addCategory} />
                        ))}
                    </div>
                </Col>
                <Col md={9}>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : logbooks.map((logbook) => (
                            <LogbookCard logbook={logbook} key={logbook._id}/>
                        )
                    )}
                </Col>
            </Row>

        </Container>
    );
};

export default Logbooks;