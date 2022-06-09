import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Image} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "./styles.scss";
import { commentNews } from "../../actions/news";
import NoImg from '../../images/noimg.jpg';

const CommentsSection = ({comments, type, postId}) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.length > 0){
            switch(type) {
                case 'news':
                    dispatch(commentNews(postId, {message: text}));
                    break;
            }
            setText('');
        }
    }

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
                    <div className="avatar avatar-md"><Image src={user.result.avatar ? user.result.avatar : NoImg} /></div>
                    <Form className="form" onSubmit={handleSubmit}>
                        <Form.Group className="textarea">
                            <Form.Control as="textarea" rows={3} value={text} onChange={(e) => {e.preventDefault(); setText(e.target.value)}} placeholder="Написать комментарии"></Form.Control>
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
                                <Image src={comment.user.avatar ? comment.user.avatar : NoImg} />
                            </div>
                            <div>
                                <div className="username">{comment.user?.firstname + " " + comment.user?.lastname}</div>
                                <div className="car">{comment.user.cars.length > 0 ? `Я езжу на ${comment.user.cars[0].mark} ${comment.user.cars[0].model} ${comment.user.cars[0].generation}` : `У меня нет машины`}</div>
                            </div>
                        </div>
                        <div className="comment-message">{comment.message}</div>
                        {/* <div className="answer">Ответить</div> */}
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

