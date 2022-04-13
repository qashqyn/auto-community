import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Spinner, Container } from "react-bootstrap";

import { getNews } from '../../actions/news';

import SingleNews from "./SingleNews/SingleNews";
import Breadcrumbs from "../Breadcrumbs";

const News = () => {
    const { news, isLoading } = useSelector((state) => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    if(!news.length && isLoading) return "No news";
    
    return (
        <Container>
            <Breadcrumbs currentPage="Новости" />
            <h1>Новости</h1>
            {isLoading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </Spinner>
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

