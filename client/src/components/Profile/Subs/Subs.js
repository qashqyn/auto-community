import React, { useEffect } from "react";
import { Button, Image, Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSubs, subscribe } from "../../../actions/user";

import NoImg from '../../../images/noimg.jpg';

import './styles.scss';


const Subs = () => {
    const dispatch = useDispatch();
    const { subs } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getSubs());
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('profile'));

    const subscribeUser = (e) => {
        e.preventDefault();
        if(user && user.result && user.result._id){
            dispatch(subscribe(e.target.value));
        }
    }
    const isFollowed = (subId) => {

        // console.log(subs.subscriptions);
        let ans = false;
        subs.subscriptions.map((sub) => {
            console.log(sub.cars);
            if(String(sub._id) === String(subId))
                ans = true;
        })
        return ans;
    }

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
                                    <div className="author-name">
                                        {sub.firstname} {sub.lastname}
                                    </div>
                                    <div className="author-car">
                                        {(sub.cars && sub.cars[0]) ? (`Я езжу на ${sub.cars[0].mark} ${sub.cars[0].model} ${sub.cars[0].generation}`)  : ('У меня нет машины')}
                                    </div>
                                </div>
                                <div className='follow-btn'>
                                    {isFollowed(sub._id) ? (
                                        <Button value={sub._id} onClick={subscribeUser} className="unsubscribe">Отписаться</Button>
                                    ) : (
                                        <Button value={sub._id} onClick={subscribeUser}>Подписаться</Button>
                                    )}
                                </div>
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
                                    <div className="author-name">
                                        {sub.firstname} {sub.lastname}
                                    </div>
                                    <div className="author-car">
                                        {(sub.cars && sub.cars[0]) ? (`Я езжу на ${sub.cars[0].mark} ${sub.cars[0].model} ${sub.cars[0].generation}`) : ('У меня нет машины')}
                                    </div>
                                </div>
                                <div className='follow-btn'>
                                    <Button value={sub._id} onClick={subscribeUser} className="unsubscribe">Отписаться</Button>
                                </div>
                            </div>
                        ))
                    }
                </Tab>
            </Tabs>
        </div>
    )
}

export default Subs;