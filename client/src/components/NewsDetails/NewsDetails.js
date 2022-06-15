import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Image, Spinner } from "react-bootstrap";

import { getSingleNews, likeNews } from "../../actions/news";
import Breadcrumbs from "../Breadcrumbs";

import CommentsSection from "../CommentsSection/CommentsSection";

import "./styles.scss";
import LoginModal from "../Modals/LoginModal";
import Likes from "../Likes";

const NewsDetails = () => {
    const { post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();    

    const user = JSON.parse(localStorage.getItem('profile'));

    const [ isFav, setFav ] = useState(false);
    // const {isLiked, isFav } = useSelector({false, false})

    useEffect(() => {
        dispatch(getSingleNews(id));     
    }, [id]);

    const favNews = (e) => {
        e.preventDefault();
        setFav(!isFav);
    }

    return (
        <Container className="news">
            {(isLoading || !post) ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Breadcrumbs links={[{link:'/news', name: 'Новости'}]} currentPage={post.title} />
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
                        <Likes likes={post.likes} user={user?.result} type="news" postId={post._id} />
                        <div className="action">
                            <div className="icon-container">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M40 0H0V40H40V0Z" fill="white" fillOpacity="0.01"/>
                                    <path d="M40 0H0V40H40V0Z" fill="white" fillOpacity="0.01"/>
                                    <path d="M36.6668 5H3.3335V30H10.8335V34.1667L19.1668 30H36.6668V5Z" stroke="black" strokeWidth="1.6"/>
                                    <path d="M11.6665 16.25V18.75" stroke="black" strokeWidth="1.6"/>
                                    <path d="M20 16.25V18.75" stroke="black" strokeWidth="1.6"/>
                                    <path d="M28.3335 16.25V18.75" stroke="black" strokeWidth="1.6"/>
                                </svg>
                            </div>
                            {post.comments.length}
                        </div>
                        <div className="action" onClick={favNews}>
                            <div className="icon-container">
                                {isFav ? (
                                    <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 28.3332V1.6665H21V28.3332L11 23.4134L1 28.3332Z" fill="#457B9D" stroke="#457B9D" strokeWidth="1.6"/>
                                    </svg>
                                ) : (
                                    <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 28.3332V1.6665H21V28.3332L11 23.4134L1 28.3332Z" stroke="black" strokeWidth="1.6"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <CommentsSection comments={post.comments} type="news" postId={post._id} /> 
                </div>
            )}
        </Container>
    );
}

export default NewsDetails;

