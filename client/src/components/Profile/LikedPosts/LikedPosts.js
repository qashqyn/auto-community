import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getLiked } from '../../../actions/user';
import LogbookCard from '../../Logbooks/LogbookCard/LogbookCard';
import SingleNews from '../../News/SingleNews/SingleNews';

import './styles.scss';

const nothing = ({name, link}) => {
    return (
        <div className='nothing'>
            <div className='content'>
                <h3>Вы еще не добавили понравившиеся объявления {name}</h3>
                <LinkContainer to={link}>
                    <Button>Перейти в {name}</Button>
                </LinkContainer>
            </div>
        </div>
    )
}
const loading = () => {
    return (
        <div className="text-center p-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </Spinner>
        </div>
    )
}

const LikedPosts = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const { isLoading } = useSelector((state) => state.posts);
    const { likedPosts } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getLiked());
    }, [dispatch]);

    return (
        <div id='myPosts'>
            <Tabs defaultActiveKey="likedLogbooks" id="likedPosts">
                <Tab eventKey="likedLogbooks" title="Бортжурнал">
                    {(isLoading || !likedPosts) ? 
                        loading()
                    : likedPosts.likedLogbooks.length === 0 ? 
                        nothing({'name':'Бортжурнале', 'link': '/logbook'}) 
                        : 
                        likedPosts.likedLogbooks.map((post, key) => (<LogbookCard key={key} logbook={post} />)) 
                    } 
                </Tab>
                <Tab eventKey="likedNews" title="Новости">
                        {(isLoading || !likedPosts) ? 
                            loading()
                            : likedPosts.likedNews.length === 0 ? 
                            nothing({'name':'Новости', 'link': '/news'}) 
                            : (
                                <Row xs={1} md={2} lg={3}>
                                    {likedPosts.likedNews.map((post, key) => (<Col key={key}><SingleNews news={post} /></Col>))}
                                </Row>  
                            )
                        } 
                </Tab>
            </Tabs>
        </div>
    );
};

export default LikedPosts;