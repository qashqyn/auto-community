import React, { useState } from "react";

import { Button, Form, Image} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "./styles.scss";

const CommentsSection = ({comments}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    return (
        <div className="comments">
            <div className="h4">Комментарии <span className="count">{comments.length}</span></div> 
            {!user?.result ? (
                <div className="guest">
                    <p>Участвовать в обсуждениях могут только зарегистрированные пользователи.</p>
                    <LinkContainer to="/login"><Button className="login">Войти</Button></LinkContainer>
                    <LinkContainer to="/signup"><Button className="registr">Регистрироваться</Button></LinkContainer>
                </div>
            ) : (
                <div className="d-flex">
                    <div className="avatar-md"><Image  /></div>
                    <Form className="w-100">
                        <Form.Group>
                            <Form.Control as="textarea" rows={3}></Form.Control>
                        </Form.Group>
                        <div className="d-flex">
                            <Button className="ml-auto" type="submit">Отправить</Button>
                        </div>
                    </Form>
                </div>
            )}
            {comments.map((comment) => (
                <div className="comment" key={comment._id}>
                    <div className="comment-heading">
                        <div className="avatar">
                            <Image />
                        </div>
                        <div>
                            <div className="username">{comment.user.firstname + " " + comment.user.lastname}</div>
                            <div className="car">Я езжу на {comment.user.car}</div>
                        </div>
                    </div>
                    <div className="comment-message">{comment.message}</div>
                    <div className="answer">Ответить</div>
                </div>
            ))}
        </div>
    );
}

export default CommentsSection;

