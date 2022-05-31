import React, { useState } from "react";

import { Button, Form, Image} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "./styles.scss";

const CommentsSection = ({comments}) => {
    const user = JSON.parse(localStorage.getItem('profile'));


    return (
        <div className="comments">
            <div className="h4">Комментарии <span className="count">{comments.length}</span></div> 
            {!user?.result ? (
                <div className="guest">
                    <p>Участвовать в обсуждениях могут только зарегистрированные пользователи.</p>
                    <div>
                        <LinkContainer to="/login"><Button className="login">Войти</Button></LinkContainer>
                        <LinkContainer to="/signup"><Button className="register">Регистрироваться</Button></LinkContainer>
                    </div>
                </div>
            ) : (
                <div className="d-flex">
                    <div className="avatar avatar-md"><Image src={user.result.avatar} /></div>
                    <Form className="w-100 form">
                        <Form.Group className="textarea">
                            <Form.Control as="textarea" rows={3} placeholder="Написать комментарии"></Form.Control>
                        </Form.Group>
                        <div className="d-flex">
                            <Button type="submit">Отправить</Button>
                        </div>
                    </Form>
                </div>
            )}
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                        <div className="comment-heading">
                            <div className="avatar avatar-sm">
                                <Image src={comment.author?.avatar} />
                            </div>
                            <div>
                                <div className="username">{comment.user?.firstname + " " + comment.user?.lastname}</div>
                                <div className="car">Я езжу на {comment.user?.car}</div>
                            </div>
                        </div>
                        <div className="comment-message">{comment.message}</div>
                        <div className="answer">Ответить</div>
                    </div>
                ))
            ) : (
                <div className="no-comments">
                    Нет комментариев. Будьте первым!
                </div>
            )}
        </div>
    );
}

export default CommentsSection;

