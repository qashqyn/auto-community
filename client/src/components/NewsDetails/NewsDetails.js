import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Container, Form, Image, Spinner } from "react-bootstrap";

import { getSingleNews } from "../../actions/news";
import Breadcrumbs from "../Breadcrumbs";
import { LinkContainer } from "react-router-bootstrap";

import CommentsSection from "../CommentsSection/CommentsSection";

import "./styles.scss";

const NewsDetails = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { singleNews, isLoading } = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();    

    useEffect(() => {
        dispatch(getSingleNews(id));
    }, [id]);

    // var momentRu = moment().locale('ru');

    return (
        <Container className="news">
            <Breadcrumbs currentPage="Новости" />
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <p className="top-moment">{moment(singleNews.createdAt).format("DD MMMM YYYY")}</p>
                    <div className="heading">{singleNews.title}</div>
                    <div className="subheading">{singleNews.title}</div>
                    <div className="img">
                        <Image src={singleNews.selectedFile} />
                    </div>
                    <div className="parahraph">
                        {singleNews.message}
                    </div>
                    <CommentsSection comments={singleNews.comments} /> 
                </div>
            )}
        </Container>
    );
}

export default NewsDetails;

