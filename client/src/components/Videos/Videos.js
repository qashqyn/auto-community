import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Row, Col, Spinner, Container, Dropdown } from "react-bootstrap";

import { getVideos } from '../../actions/videos';

import Video from "./Video/Video";
import Breadcrumbs from "../Breadcrumbs";
import Paginate from "../Paginate/Paginate";

const tagsArray = ["Тест-драйвы", "Путешествия", "Ремонт", "Покупка машины", "История", "Фотосессии", "Новые модели", "Спорткары", "Электромобили", "Безопасность", "Обучение", "Шины и диски"];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Vidoes = () => {
    const {videos, isLoading} = useSelector((state) => state.videos);
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const query = useQuery();
    const page = query.get('page') || 1;

    const [isAdmin, setAdmin] = useState(false);

    useEffect(()=> {
        setAdmin(user && user.result && user.result.is_admin)
    }, [user]);

    const addTag = async (tag) => {
        if(!tags.includes(tag)){
            setTags((prevState) => [...prevState, tag]);
            dispatch(getVideos(tags,1));
        }
    }
    const removeTag = async (tag) => {
        setTags(tags.filter(item => item !== tag));
        dispatch(getVideos(tags,1));
    }

    
    return (
        <Container>
            <Breadcrumbs currentPage="Видео" />
            <div className="top">
                <h1>Видео</h1>
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
                                <path d="M24 0H0V24H24V0Z" fill="#333333" fillOpacity="0.01"/>
                                <path d="M5 5L19 19" stroke="#333333" strokeWidth="2"/>
                                <path d="M5 19L19 5" stroke="#333333" strokeWidth="2"/>
                            </svg>
                        </span>
                    </div>
                ))}
            </div>

            {(isLoading || !videos) ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Row xs={1} md={2} lg={3}>
                        {videos.map((video) => (
                            <Col key={video._id}>
                                <Video video={video} isAdmin={isAdmin} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
            <Paginate page={Number(page)} tags={tags} type="video" />
        </Container>
    );
}

export default Vidoes;

