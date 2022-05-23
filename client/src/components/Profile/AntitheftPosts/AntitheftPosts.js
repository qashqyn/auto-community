import React, { useEffect, useState } from "react";
import { Button, Card, Image, Modal, Spinner, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAntitheftPosts, getAntitheftPost, adminSetAntitheftStatus } from "../../../actions/antitheft";
import moment from 'moment';

import './styles.scss';
import ImageCarousel from "../../ImageCarousel";
import { CLEAR_STATE } from "../../../constants/actionTypes";

const AntitheftPosts = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, post, status } = useSelector((state) => state.posts);
    const [crStatus, setCrStatus] = useState("");

    const [open, setOpen] = useState(false);
    const [statusModal, setStatusModal] = useState(false);

    useEffect(()=>{
        dispatch(getAdminAntitheftPosts(crStatus));
        if(status){
            if(status === 204 || status > 400){
                setOpen(false);
                setStatusModal(true);    
            }
        }   
    }, [dispatch, status, crStatus])

    const openPost = (e) => {
        e.preventDefault();
        dispatch({type: CLEAR_STATE});
        dispatch(getAntitheftPost(e.target.value));
        setOpen(true);
    }
    const closePost = (e) => {
        e.preventDefault();
        setOpen(false);
    }

    const changeStatus = (e) => {
        e.preventDefault();
        dispatch(adminSetAntitheftStatus(post._id, e.target.value));
    }
    const chooseStatus = (e) => {
        e.preventDefault();
        dispatch({type: CLEAR_STATE});
        setCrStatus(e.target.value);
    }
    const closeStatusModal = (e) => {
        // e.preventDefault();
        console.log("close")
        setStatusModal(false);
    }
 

    return (
        <div id="antitheft-posts">
            <Modal show={statusModal} onHide={() => {setStatusModal(false);}}>
                <Modal.Header className={"statusModalHeader status" + status} closeButton>{status===204 ? ("Успех") : ("Ошибка")}</Modal.Header>
                <Modal.Body>
                    <p>
                        {status===204 ? ("Статус поста успешно изменен.") : ("Что-то пошло не так. Пожалуйста попробуйте позже.")}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeStatusModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>

            <Modal size="xl" show={open} onHide={() => {setOpen(false);}} centered>
                {post ? (
                    <>
                        <Modal.Header closeButton> 
                            <Modal.Title>{post.mark + " " + post.model + " " + (moment(post.releaseYear).format("YYYY"))}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="left">
                                <div className="details">
                                    <p>Гос.номер: <span>{post.stateNumber}</span></p>
                                    <p>VIN - номер: <span>{post.vin}</span></p>
                                    <p>Цвет: <span></span>{post.color}</p>
                                    <p>Место кражи: <span>{post.location}</span></p>
                                    <p>Дата кражи: <span>{moment(post.thiftDate).format("DD.MM.YYYY")}</span></p>
                                    <p>Сумма вознаграждения: <span className="amount">{post.amount} ₸</span></p>
                                    
                                </div>
                                {post.specialMarks && (
                                    <div className="special-marks">
                                        <h3>Особые отметки</h3>
                                        <p>{post.specialMarks}</p>
                                    </div>
                                )}
                                <div className="author">
                                    <h3>Владелец</h3>
                                    <div className="d-flex">
                                        <div className="avatar avatar-sm">
                                            <Image src={post.author?.avatar} />
                                        </div>
                                        <div>
                                            <p>{post.author?.firstname + " " + post.author?.lastname}</p>
                                            <a href={"tel:"+post.author?.tel}>{post.author?.tel}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <ImageCarousel images={post.selectedFiles} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={closePost}>Закрыть</Button>
                            <Button value="dismissed" onClick={changeStatus}>Отклонить</Button>
                            <Button value="approved" onClick={changeStatus}>Одобрить</Button>
                        </Modal.Footer>
                    </>
                ) : (
                    <div className="spinner text-center m-3">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                )}
            </Modal>
            
            <div className="chooseStatusBtns">
                <Button value="" onClick={chooseStatus}>Все</Button>
                <Button value="waiting" onClick={chooseStatus}>В ожидании</Button>
                <Button value="approved" onClick={chooseStatus}>Одобрено</Button>
                <Button value="dismissed" onClick={chooseStatus}>Отклонено</Button>
            </div>

            {(isLoading || !posts) ? (
                <div className="spinner text-center m-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : 
                posts.length>0 ? (
                    <div className="posts-list">
                        {
                            posts.map((post, key) => (
                                <Card key={key}>
                                    <Card.Body>
                                        <Card.Title>{post.mark} {post.model} {(new Date(post.releaseYear).getFullYear())}</Card.Title>
                                        <Card.Text>
                                            Дата: {moment(post.createdAt).format('DD-MM-YYYY HH:mm')}
                                            <span className={post.status}>Статус: </span>
                                        </Card.Text>
                                        <div className="btns">
                                            <Button value={post._id} onClick={openPost} >Открыть пост</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </div>
                )
                    : (
                        <div className="nothing">Заявок нет</div>
                    )
            }
        </div>
    )
};

export default AntitheftPosts;