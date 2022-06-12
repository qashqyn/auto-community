import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserLogbooks } from '../../../actions/logbook';
import { getMyPosts } from '../../../actions/user';
import AntitheftCard from '../../Antitheft/AntitheftCard/AntitheftCard';
import LogbookCard from '../../Logbooks/LogbookCard/LogbookCard';
import MarketCard from '../../Market/MarketCard/MarketCard';

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
    const { isLoading } = useSelector((state) => state.posts);
    const { myPosts } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getMyPosts());
    }, [dispatch, user]);

    return (
        <div id='myPosts'>
            <Tabs defaultActiveKey="myLogbooks" id="myPostsTab">
                <Tab eventKey="myLogbooks" title="Бортжурнал">
                    {(isLoading || !myPosts || !myPosts.logbooks)? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : myPosts.logbooks.length === 0 ? 
                        nothing({'name':'Бортжурнале', 'link': '/logbook'}) 
                        : myPosts.logbooks.map((logbook, key) => (<LogbookCard key={key} logbook={logbook} isAuthor={true}  update={true} />)) 
                    } 
                </Tab>
                <Tab eventKey="myMarketPosts" title="Магазин">
                    {(isLoading || !myPosts || !myPosts.market)? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ): myPosts.market.length === 0 ? 
                        nothing({'name':'Магазине', 'link': '/market'})
                        : (
                            <Row xs={1} md={3}>
                                {myPosts.market.map((post, key) => (
                                    <Col key={key}>
                                        <MarketCard isAuthor={true}  post={post} />
                                    </Col>
                                )) }
                            </Row>
                        )
                    } 
                </Tab>
                <Tab eventKey="myAntitheftPosts" title="Антиугон">
                    {(isLoading || !myPosts || !myPosts.antitheft)? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ): myPosts.antitheft.length === 0 ? 
                        nothing({'name':'разделе Антиугон', 'link': '/antitheft'})
                        : myPosts.antitheft.map((post, key) => (<AntitheftCard key={key} isAuthor={true}  post={post}  />)) 
                    } 
                </Tab>
            </Tabs>
        </div>
    );
};

export default MyPosts;