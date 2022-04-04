import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Spinner } from "react-bootstrap";

import { getVideos } from '../../actions/videos';

import Video from "./Vide/Video";

const Vidoes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideos());
    }, [dispatch]);

    const news = useSelector((state) => state.news);
    
    return (
        <>
            <h1>Видео</h1>
            {!videos.length ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </Spinner>
            ) : (
                <Row xs={1} md={2} lg={3}>
                    {videos.map((video) => (
                        <Col key={video._id}>
                            <Video news={videos} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export default News;

