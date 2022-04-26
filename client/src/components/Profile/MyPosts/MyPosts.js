import React, { useEffect, useState } from 'react';
import { Button, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserLogbooks } from '../../../actions/logbook';
import LogbookCard from '../../Logbooks/LogbookCard/LogbookCard';

import './styles.scss';

const nothing = ({name, link}) => {
    return (
        <div className='nothing'>
            <div className='content'>
                <h3>У вас еще нет публикации в {name}</h3>
                <LinkContainer to={link}>
                    <Button>Добавить объявление</Button>
                </LinkContainer>
            </div>
        </div>
    )
}

const MyPosts = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserLogbooks());
    }, [dispatch, user]);

    return (
        <div id='myPosts'>
            <Tabs defaultActiveKey="myLogbooks" id="myPostsTab">
                <Tab eventKey="myLogbooks" title="Бортжурнал">
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ): posts.length > 0 ? nothing({'name':'Бортжурнале', 'link': '/logbook'}) : posts.map((post) => (<LogbookCard logbook={post} key={post._id} update={true} />)) 
                    } 
                </Tab>
                <Tab eventKey="myMarketPosts" title="Магазин">
                    {nothing({'name':'Магазине', 'link': '/market'})}
                </Tab>
                <Tab eventKey="myAntitheftPosts" title="Антиугон">
                    {nothing({'name':'разделе Антиугон', 'link': '/antitheft'})}
                </Tab>
            </Tabs>
        </div>
    );
};

export default MyPosts;