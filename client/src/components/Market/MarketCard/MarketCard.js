import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteMarketPost } from "../../../actions/market";

import './styles.scss';

const MarketCard = ({post, isAuthor=false}) => {
    const [show, setShow] = useState(false); 
    const dispatch = useDispatch();

    const openDeleteModal = () => setShow(true);
    const closeDeleteModal = () => setShow(false);

    const deletePost = (e) => {
        e.preventDefault();
        closeDeleteModal();
        dispatch(deleteMarketPost(post._id));
    }
    return (
        <>
            <Modal show={show} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить товар</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Удалить товар "{post.title}" ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeDeleteModal}>Отмена</Button>
                    <Button onClick={deletePost}>Удалить</Button>
                </Modal.Footer>
            </Modal>
            <Card className="marketCard">
                {isAuthor && (
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
                <LinkContainer to={`/market/${post._id}`}>
                    <Card.Body>
                        <Card.Img src={post?.imgs && post?.imgs[0]} />
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.location}</Card.Text>
                        <Card.Text className="cost">{post.cost} ₸</Card.Text>
                    </Card.Body>
                </LinkContainer>
            </Card>
        </>
    );
};

export default MarketCard;