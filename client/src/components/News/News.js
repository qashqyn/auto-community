import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Spinner, Container, Dropdown } from "react-bootstrap";

import { getNews } from '../../actions/news';

import SingleNews from "./SingleNews/SingleNews";
import Breadcrumbs from "../Breadcrumbs";

import './styles.scss';

const tagsArray = ["Тест-драйвы", "Путешествия", "Ремонт", "Покупка машины", "История", "Фотосессии", "Новые модели", "Спорткары", "Электромобили", "Безопасность", "Обучение", "Шины и диски"];

const News = () => {
    const { posts: news, isLoading } = useSelector((state) => state.posts);
    const [ tags, setTags ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNews(tags));
    }, [dispatch]);

    const addTag = async (tag) => {
        if(!tags.includes(tag)){
            setTags((prevState) => [...prevState, tag]);
            dispatch(getNews(tags));
        }
    }
    const removeTag = async (tag) => {
        setTags(tags.filter(item => item != tag));
        dispatch(getNews(tags));
    }

    return (
        <Container>
            <Breadcrumbs currentPage="Новости" />
            <div className="top">
                <h1>Новости</h1>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-tags">Теги</Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        {tagsArray.map((item, key) => (
                            <Dropdown.Item key={key} onClick={(e) => {
                                e.preventDefault();
                                addTag(item);
                            }}>{item}</Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="tags">
                {tags.map((tag, key) => (
                    <div className="tag" key={key}>
                        {tag}
                        <span onClick={(e) => {
                            e.preventDefault();
                            removeTag(tag);
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 0H0V24H24V0Z" fill="#333333" fill-opacity="0.01"/>
                                <path d="M5 5L19 19" stroke="#333333" stroke-width="2"/>
                                <path d="M5 19L19 5" stroke="#333333" stroke-width="2"/>
                            </svg>
                        </span>
                    </div>
                ))}
            </div>

            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3}>
                    {news.map((singleNews) => (
                        <Col key={singleNews._id}>
                            <SingleNews news={singleNews} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default News;

