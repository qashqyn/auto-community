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
import LoginModal from '../Modals/LoginModal';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const markOptions = ['AC Cobra'];

const categories = ['Автозвук', 'Аксессуары', 'Видео', 'Визит на сервис', 'Встреча', 'Другое', 'ДТП', 'Заправка', 'Запчасти', 'Колёсные диски', 'Кузовной ремонт', 'Мойка', 'Наблюдение', 'Налоги и пошлины', 'Нарушение ПДД', 'Обкатка', 'Плановое ТО', 'Покатушки', 'Покупка машин', 'Поломка', 'Помощь на дороге', 'Прикол', 'Продажа машин', 'Просто так', 'Путешествие', 'Расходники', 'Рейтинг и продвижение', 'Своими руками', 'Соревнования', 'Стайлинг', 'Страхование', 'Тест-драйв', 'Техосмотр', 'Тюнинг', 'Фотография', 'Шины', 'Эвакуация', 'Электроника'];

const Logbooks = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { posts: logbooks, isLoading } = useSelector((state) => state.posts);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

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

    const openLoginModal = (e) =>{
        e.preventDefault();
        setShow(true);
    }

    return (
        <Container>
            <LoginModal show={show} setShow={setShow} text="Добавить объвление могут только зарегистрированные пользователи." />
            <Breadcrumbs currentPage="Бортжурнал" />
                <h1>Бортжурнал</h1>
            <div className="top">
                <div>
                    search
                </div>
                {user?.result ? (
                    <LinkContainer to="/logbook/form">
                        <Button>Добавить объявление</Button>
                    </LinkContainer>
                ) : (
                    <Button onClick={openLoginModal} >Добавить объявление</Button>
                )}
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
                    {(isLoading || !logbooks) ? (
                        <div className="text-center p-5">
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