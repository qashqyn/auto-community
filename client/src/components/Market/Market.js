import React, { useState } from "react";
import { Row, Spinner,Col, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Paginate from "../Paginate/Paginate";
import Input from "../SignUp/Input";

import MarketCard from "./MarketCard/MarketCard";

import './styles.scss';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const categories = ['Автозвук и мультимедиа', 'Автосвет', 'Аксессуары', 'Гаджеты', 'Двигатель и выхлопная система', 'Инструменты', 'Климат', 'Кузов', 'Подвеска', 'Рулевое управление', 'Салон', 'Тормозная система', 'Трансмиссия', 'Шины и диски', 'Электрооборудование', 'Другое'];

const Market = () => {
    const {posts, isLoading} = useSelector((state) => state.posts);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const query = useQuery();
    const page = query.get('page') || 1;

    const addCategory = (e) => {
        if(!selectedCategories.includes(e.target.id) && e.target.checked){
            setSelectedCategories([...selectedCategories, e.target.id]);
        }else if(selectedCategories.includes(e.target.id) && !e.target.checked){
            setSelectedCategories(selectedCategories.filter(item => item != e.target.id));
        }
    }

    return (
        <Container>
            <Breadcrumbs currentPage="Магазин" />
            <h1>Магазин</h1>
            <div className="d-flex justify-content-between">
                <div>
                    search
                </div>
                <LinkContainer to="/market/form">
                    <Button>Добавить объявление</Button>
                </LinkContainer>
            </div>
            <Row>
                <Col xs={3}>
                    <div className="category-filter">
                        <h3>Категории</h3>
                        {categories.map((category, key) => (
                            <Input key={key} type="checkbox" name={category} label={category} handleChange={addCategory} />
                        ))}
                    </div>
                    <div className="condition-filter">
                        <h3>Состояние</h3>
                        <Input type="radio" name="condition" options={[{label:'Любое', value: 'any'}, {label:'Только новое', value:'Новое'}, {label: 'Только б/у', value: 'Б/У'}]} handleChange={addCategory} />
                    </div>
                </Col>
                <Col xs={9}>
                    <Row xs={1} md={3}>
                        {isLoading ? (
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </Spinner>
                            </div>
                        ) : 
                            posts.map((post) => (
                                <Col key={post._id}>
                                    <MarketCard post={post} />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
            <Paginate page={Number(page)} type="market"/>
        </Container>
    );
};

export default Market;