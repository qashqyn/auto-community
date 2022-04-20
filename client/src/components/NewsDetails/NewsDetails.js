import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Image, Spinner } from "react-bootstrap";

import { getSingleNews } from "../../actions/news";
import Breadcrumbs from "../Breadcrumbs";
import { LinkContainer } from "react-router-bootstrap";

import CommentsSection from "../CommentsSection/CommentsSection";

import "./styles.scss";

const NewsDetails = () => {
    const { post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();    

    const [ isLiked, setLiked ] = useState(false);
    const [ isFav, setFav ] = useState(false);
    // const {isLiked, isFav } = useSelector({false, false})

    useEffect(() => {
        dispatch(getSingleNews(id));
    }, [id]);

    // var momentRu = moment().locale('ru');

    const likeNews = (e) => {
        e.preventDefault();
        setLiked(!isLiked);
    }
    const favNews = (e) => {
        e.preventDefault();
        setFav(!isFav);
    }

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
                    <p className="top-moment">{moment(post.createdAt).format("DD MMMM YYYY")}</p>
                    <div className="heading">{post.title}</div>
                    <div className="subheading">{post.subtitle}</div>
                    <div className="img">
                        <Image src={post.selectedFile} />
                    </div>
                    <div className="paragraph">
                        {post.message}
                    </div>
                    <div className="actions">
                        <div className="action" onClick={likeNews}>
                            <div className="icon-container">
                                {isLiked ? (
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0003 30C-13.75 9.73607 6.14811 -6.07988 14.6702 2.28609C14.7828 2.39609 14.8934 2.51009 15.0003 2.62809C15.1061 2.5102 15.2161 2.39678 15.3303 2.28809C23.8505 -6.08388 43.7505 9.73406 15.0003 30Z" fill="#457B9D"/>
                                    </svg>                                    
                                ) : (
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0003 5.49608L13.6558 4.02208C10.5001 0.562095 4.7137 1.75609 2.62488 6.10608C1.64423 8.15207 1.42297 11.1061 3.21365 14.876C4.9387 18.506 8.52756 22.854 15.0003 27.59C21.473 22.854 25.0599 18.506 26.7869 14.876C28.5775 11.1041 28.3582 8.15207 27.3756 6.10608C25.2868 1.75609 19.5004 0.560095 16.3447 4.02008L15.0003 5.49608ZM15.0003 30C-13.75 9.73607 6.14812 -6.07988 14.6702 2.28609C14.7828 2.39609 14.8934 2.51009 15.0003 2.62809C15.1061 2.5102 15.2161 2.39678 15.3303 2.28809C23.8505 -6.08388 43.7505 9.73407 15.0003 30Z" fill="black"/>
                                    </svg>
                                )}
                            </div>
                            {post.likes.length}
                        </div>
                        <div className="action">
                            <div className="icon-container">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M40 0H0V40H40V0Z" fill="white" fill-opacity="0.01"/>
                                    <path d="M40 0H0V40H40V0Z" fill="white" fill-opacity="0.01"/>
                                    <path d="M36.6668 5H3.3335V30H10.8335V34.1667L19.1668 30H36.6668V5Z" stroke="black" stroke-width="1.6"/>
                                    <path d="M11.6665 16.25V18.75" stroke="black" stroke-width="1.6"/>
                                    <path d="M20 16.25V18.75" stroke="black" stroke-width="1.6"/>
                                    <path d="M28.3335 16.25V18.75" stroke="black" stroke-width="1.6"/>
                                </svg>
                            </div>
                            {post.comments.length}
                        </div>
                        <div className="action" onClick={favNews}>
                            <div className="icon-container">
                                {isFav ? (
                                    <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 28.3332V1.6665H21V28.3332L11 23.4134L1 28.3332Z" fill="#457B9D" stroke="#457B9D" stroke-width="1.6"/>
                                    </svg>
                                ) : (
                                    <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 28.3332V1.6665H21V28.3332L11 23.4134L1 28.3332Z" stroke="black" stroke-width="1.6"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <CommentsSection comments={post.comments} /> 
                </div>
            )}
        </Container>
    );
}

export default NewsDetails;

