import React, { useState } from "react";
import moment from "moment";

import { Button, Card, Modal } from "react-bootstrap";

import './style.scss';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { deleteNews } from "../../../actions/news";

const SingleNews = ({ news, isAdmin=false }) => {
    const [show, setShow] = useState(false); 
    const dispatch = useDispatch();

    const openDeleteModal = () => setShow(true);
    const closeDeleteModal = () => setShow(false);

    const deletePost = (e) => {
        e.preventDefault();
        closeDeleteModal();
        dispatch(deleteNews(news._id));
    }

    return (
        <>
            <Modal show={show} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить новость</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Удалить новость "{news.title}" ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeDeleteModal}>Отмена</Button>
                    <Button onClick={deletePost}>Удалить</Button>
                </Modal.Footer>
            </Modal>
            <Card className="news-card">
                <Card.Body>
                    {isAdmin && (
                        <div className="admin-pan">
                            <div onClick={openDeleteModal}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0H0V18H18V0Z" fill="white" fillOpacity="0.01"/>
                                    <path d="M3.375 3.75V16.5H14.625V3.75H3.375Z" stroke="white"/>
                                    <path d="M7.5 7.5V12.375" stroke="white"/>
                                    <path d="M10.5 7.5V12.375" stroke="white"/>
                                    <path d="M1.5 3.75H16.5" stroke="white"/>
                                    <path d="M6 3.75L7.23337 1.5H10.7914L12 3.75H6Z" stroke="white"/>
                                </svg>
                            </div>
                        </div>
                    )}
                    <Card.Img variant="top" src={news.selectedFile} />
                    <Card.Subtitle>{news.tag}&emsp;{moment(news.createdAt).format("DD/MM/YYYY")}</Card.Subtitle>
                    <Card.Title>{news.title}</Card.Title>
                    <Card.Text>{news.message}</Card.Text>
                    <LinkContainer to={`/news/${news._id}`}>
                        <Card.Link>Читать больше</Card.Link>
                    </LinkContainer>
                </Card.Body>
            </Card>
        </>
    );
}

export default SingleNews;

