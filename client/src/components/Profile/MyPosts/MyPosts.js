import React, { useEffect, useState } from 'react';
import { Spinner, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogbooks } from '../../../actions/logbook';
import LogbookCard from '../../Logbooks/LogbookCard/LogbookCard';

const MyPosts = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserLogbooks());
    }, [dispatch, user]);

    return (
        <Tabs defaultActiveKey="myLogbooks" id="myPostsTab">
            <Tab eventKey="myLogbooks" title="Бортжурнал">
                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                ):  posts.map((post) => (
                        <LogbookCard logbook={post} key={post._id} update={true} />
                    )
                ) }
            </Tab>
        </Tabs>
    );
};

export default MyPosts;