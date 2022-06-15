import React, { useEffect, useState } from "react";
import { Button, Image, Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSubs, subscribe } from "../../../actions/user";
import {LinkContainer } from "react-router-bootstrap";

import NoImg from '../../../images/noimg.jpg';

import './styles.scss';
import SubscribeBtn from "../../Subscribe/SubscribeBtn";


const Subs = () => {
    const dispatch = useDispatch();
    const { subs: subbs } = useSelector((state) => state.auth);

    const [subs, setSubs] = useState({});

    useEffect(() => {
        dispatch(getSubs());
    }, [dispatch]);

    useEffect(()=>{
        if(subbs){
            setSubs(subbs);
        }
    },[subbs])

    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <div id="subs">
            <Tabs defaultActiveKey="subscribers" id="subsTab">
                <Tab eventKey="subscribers" title="Подписчики">
                    {(!subs || !subs.subscribers) ? (
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : subs.subscribers.length === 0 ? (
                        <p>У вас еще нет подписчиков</p>
                        ) : 
                        subs.subscribers.map((sub, key) => (
                            <div className="sub" key={key}>
                                <div className="avatar avatar-sm">
                                    <Image src={sub.avatar ? sub.avatar : NoImg} />
                                </div>
                                <div className='author-info'>
                                        <LinkContainer to={`/profile/${sub._id}`}>
                                            <div className="author-name">
                                                {sub.firstname} {sub.lastname}
                                            </div>
                                        </LinkContainer>
                                        <div className="author-car">
                                            {(sub.cars && sub.cars[0]) ? (`Я езжу на ${sub.cars[0].mark} ${sub.cars[0].model} ${sub.cars[0].generation}`)  : ('У меня нет машины')}
                                        </div>
                                    </div>
                                <SubscribeBtn otherUserId={sub._id} user={user?.result} />
                            </div>
                        ))
                    }
                </Tab>
                <Tab eventKey="subscriptions" title="Подписки">
                    {(!subs || !subs.subscriptions) ? (
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : subs.subscriptions.length === 0 ? (
                        <p>Вы еще не подписаны на аккаунты других пользователи</p>
                        ) : 
                        subs.subscriptions.map((sub, key) => (
                            
                            <div className="sub" key={key}>
                                <div className="avatar avatar-sm">
                                    <Image src={sub.avatar ? sub.avatar : NoImg} />
                                </div>
                                <div className='author-info'>
                                    <LinkContainer to={`/profile/${sub._id}`}>
                                        <div className="author-name">
                                            {sub.firstname} {sub.lastname}
                                        </div>
                                    </LinkContainer>
                                    <div className="author-car">
                                        {(sub.cars && sub.cars[0]) ? (`Я езжу на ${sub.cars[0].mark} ${sub.cars[0].model} ${sub.cars[0].generation}`) : ('У меня нет машины')}
                                    </div>
                                </div>
                                <SubscribeBtn otherUserId={sub._id} user={user?.result} />
                            </div>
                        ))
                    }
                </Tab>
            </Tabs>
        </div>
    )
}

export default Subs;