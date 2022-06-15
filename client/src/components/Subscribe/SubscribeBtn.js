import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubs, subscribe } from '../../actions/user';
import LoginModal from '../Modals/LoginModal';

import './styles.scss';

const SubscribeBtn = ({otherUserId, user, btnFilled = true}) => {
    const dispatch = useDispatch();

    const [subscribed, setSubscribed] = useState(false);
    const [show, setShow] = useState(false);

    const {subs} = useSelector((state) => state.auth);

    useEffect(()=>{
        let ans = false;
        if(subs && subs.subscriptions){
            subs.subscriptions.map((sub) => {
                if(String(sub._id) === String(otherUserId))
                    ans = true;
                return sub;
            })
        }
        setSubscribed(ans);
    },[subs]);

    useEffect(()=>{
        if(user){
            dispatch(getSubs());
        }
    }, [user])

    const subscribeUser = (e) => {
        e.preventDefault();
        if(user && user._id){
            dispatch(subscribe(otherUserId));
        }else{
            setShow(true);
        }
    }

    return (!user || otherUserId !== user._id) && (
            <>
                <LoginModal show={show} setShow={setShow} text="Вы должны быть авторизованы для данного действия" />
                <div className='subscribe-btn'>
                    <Button onClick={subscribeUser} className={`${!btnFilled && 'unfilled'} ${subscribed && 'unsubscribe'}`}>{subscribed ? 'Отписаться':'Подписаться'}</Button>
                </div>
            </>
        )
};

export default SubscribeBtn;