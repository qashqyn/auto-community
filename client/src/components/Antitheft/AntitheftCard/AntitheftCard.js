import React, { useState } from "react";
import moment from "moment";

import { Button, Card, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import './styles.scss';
import NoImg from '../../../images/noimg.jpg';
import { useDispatch } from "react-redux";
import { deleteAntitheftPost } from "../../../actions/antitheft";

const AntitheftCard = ({ post, isAuthor=false }) => {
    const [show, setShow] = useState(false); 
    const dispatch = useDispatch();

    const openDeleteModal = () => setShow(true);
    const closeDeleteModal = () => setShow(false);

    const deletePost = (e) => {
        e.preventDefault();
        closeDeleteModal();
        dispatch(deleteAntitheftPost(post._id))
        // dispatch(deleteMarketPost(post._id));
    }
    return (
        <>
            <Modal show={show} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить пост</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Удалить пост "{post.mark} {post.model} {(new Date(post.releaseYear).getFullYear())}" ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeDeleteModal}>Отмена</Button>
                    <Button onClick={deletePost}>Удалить</Button>
                </Modal.Footer>
            </Modal>
            <Card className="antitheft-card">
                <LinkContainer to={`/antitheft/${post._id}`}>
                    <Card.Body>
                        {/* <div className="antitheft-card-img"> */}
                            <Card.Img variant="left" src={post.selectedFiles?.length > 0 ? post.selectedFiles[0] : NoImg} />
                        {/* </div> */}
                        <div className="info">
                            <Card.Title>{post.mark} {post.model} {(new Date(post.releaseYear).getFullYear())}</Card.Title>
                            <Card.Text>
                                <span>Сумма вознаграждения: <span>{post.amount} ₸</span></span>
                                <span>Город: <span>{post.location}</span></span>
                                <span>Гос.номер: <span>{post.stateNumber}</span></span>
                                {isAuthor && (<span>Статус поста: <span>{(post.status === 'approved') && ('Одобрено')}{(post.status === 'dismissed') && ('Отклонено')}{(post.status === 'waiting') && ('В ожидании')}</span></span>)}
                                {!isAuthor && (<span className="date">{moment(post.createdAt).format("DD.MM.YYYY")}</span>)}
                            </Card.Text>
                        </div>
                    </Card.Body>
                </LinkContainer>
                {isAuthor && (
                    <div className="admin-pan">
                        <div onClick={openDeleteModal}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 0H0V18H18V0Z" fill="black" fillOpacity="0.01"/>
                                <path d="M3.375 3.75V16.5H14.625V3.75H3.375Z" stroke="black"/>
                                <path d="M7.5 7.5V12.375" stroke="black"/>
                                <path d="M10.5 7.5V12.375" stroke="black"/>
                                <path d="M1.5 3.75H16.5" stroke="black"/>
                                <path d="M6 3.75L7.23337 1.5H10.7914L12 3.75H6Z" stroke="black"/>
                            </svg>
                        </div>
                    </div>
                )}
            </Card>
        </>
    );
}

export default AntitheftCard;

