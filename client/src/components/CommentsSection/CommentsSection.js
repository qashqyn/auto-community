import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Image} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "./styles.scss";
import { commentNews } from "../../actions/news";
import NoImg from '../../images/noimg.jpg';
import { commentLogbook } from "../../actions/logbook";
import { commentVideo } from "../../actions/videos";

const CommentsSection = ({comments, type, postId, shortComment=false}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const {comments: comss} = useSelector((state) => state.posts);

    const [text, setText] = useState('');
    const [coms, setComs] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.length > 0){
            switch(type) {
                case 'news':
                    dispatch(commentNews(postId, {message: text}));
                    break;
                case 'logbook':
                    dispatch(commentLogbook(postId, {message:text}));
                    break;
                case 'video':
                    dispatch(commentVideo(postId, {message:text}));
                    break;
            }
            setText('');
        }
    }

    useEffect(()=>{
        if(comments){
            setComs(comments);
        }
    },[comments])

    useEffect(()=>{
        if(comss && comss._id === postId){
            setComs(comss.comments);
        }
    },[comss])

    return (
        <div className={`comments ${shortComment && 'short'}`}>
            {shortComment ? (
                <>
                    {coms.length > 0 && 
                        coms.reverse().slice(0, coms.length > 3 ? 3 : coms.length).map((comment) => (
                            <div className="shortcomment" key={comment._id}>
                                <LinkContainer to={`/profile/${comment.user._id}`} >
                                    <div className="avatar avatar-xxs">
                                        <Image src={comment.user.avatar ? comment.user.avatar : NoImg} />
                                    </div>
                                </LinkContainer>
                                <div className="shortcomment-message">{comment.message}</div>
                            </div>
                        ))
                    }
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
                            <div className="avatar avatar-xs"><Image src={user.result.avatar ? user.result.avatar : NoImg} /></div>
                            <Form className="form" onSubmit={handleSubmit}>
                                <Form.Group className="textarea">
                                    <Form.Control as="textarea" rows={2} value={text} onChange={(e) => {e.preventDefault(); setText(e.target.value)}} placeholder="Написать комментарии"></Form.Control>
                                </Form.Group>
                                <div className="d-flex">
                                    <Button type="submit">Отправить</Button>
                                </div>
                            </Form>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="h4">Комментарии <span className="count">{coms.length}</span></div> 
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
                    {coms.length > 0 ? (
                        coms.map((comment) => (
                            <div className="comment" key={comment._id}>
                                <div className="comment-heading">
                                    <div className="avatar avatar-sm">
                                        <Image src={comment.user.avatar ? comment.user.avatar : NoImg} />
                                    </div>
                                    <div>
                                        <LinkContainer to={`/profile/${comment.user._id}`} >
                                            <div className="username">{comment.user?.firstname + " " + comment.user?.lastname}</div>
                                        </LinkContainer>
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
                </>
            )}
        </div>
    );
}

export default CommentsSection;

