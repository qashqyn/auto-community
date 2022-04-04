import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Spinner } from "react-bootstrap";

import { getNews } from '../../actions/news';

import SingleNews from "./SingleNews/SingleNews";

const News = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const news = useSelector((state) => state.news);
    
    return (
        <>
            <h1>Новости</h1>
            {!news.length ? (
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
        </>
    );
}

export default News;

