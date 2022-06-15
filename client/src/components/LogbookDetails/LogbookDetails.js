import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Container, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLogbook, likeLogbook } from '../../actions/logbook';
import { subscribe } from '../../actions/user';
import Breadcrumbs from '../Breadcrumbs';
import CommentsSection from '../CommentsSection/CommentsSection';

import './styles.scss';
import NoImg from '../../images/noimg.jpg';
import LoginModal from '../Modals/LoginModal';
import SubscribeBtn from '../Subscribe/SubscribeBtn';
import Likes from '../Likes';

const LogbookDetails = () => {
    const {post, isLoading} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [ isFav, setFav ] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getLogbook(id));
    },[id]);

    
    const favLogbookHandler = (e) => {
        e.preventDefault();
        setFav(!isFav);
    }

    return (
        <Container id="logbook">
            {(isLoading || !post) ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Breadcrumbs links={[{link: '/logbook', name: 'Бортжурнал'}]} currentPage={post.title}/>
                    <div className='author'>
                        <div className="avatar avatar-sm">
                            <Image src={post.author.avatar ? post.author.avatar : NoImg} />
                        </div>
                        <div className='author-info'>
                            <div className="author-name">
                                {post.author?.firstname} {post.author?.lastname}
                            </div>
                            <div className="author-car">
                                {(post.author.cars && post.author.cars[0]) ? (`Я езжу на ${post.author.cars[0].mark} ${post.author.cars[0].model} ${post.author.cars[0].generation && post.author.cars[0].generation}`) : ('У меня нет машины')}
                            </div>
                        </div>
                        <SubscribeBtn otherUserId={post.author._id} user={user?.result} />
                    </div>
                    <h3>{post.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: post.message }} className="message" />      
                    <div className='date'>
                        {moment(post.createdAt).format('DD MMMM YYYY')}
                    </div>
                    <div className="actions">
                        <Likes likes={post.likes} user={user?.result} type="logbook" postId={post._id} />
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
                        <div className="action" onClick={favLogbookHandler}>
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
                    <CommentsSection comments={post.comments} type="logbook" postId={post._id} /> 

                </>
            )}

        </Container>
    )
};

export default LogbookDetails;