import moment from 'moment';
import React, { useEffect } from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLogbook } from '../../actions/logbook';
import Breadcrumbs from '../Breadcrumbs';

import './styles.scss';

const LogbookDetails = () => {
    const {post, isLoading} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getLogbook(id));
    },[dispatch, id]);

    return (
        <Container className="logbook">
            <Breadcrumbs currentPage="Бортжурнал"/>
            {(isLoading || !post) ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <div className='author'>
                        <div className="avatar avatar-md">
                            <Image src={post.author.avatar} /> 
                        </div>
                    </div>
                    <h3>{post.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: post.message }} className="message" />      
                    {moment(post.createdAt).format('DD MMMM YYYY')}
                </>
            )}

        </Container>
    )
};

export default LogbookDetails;