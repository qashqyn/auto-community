import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Spinner, Container, Button } from "react-bootstrap";

import { getAntitheftPosts } from '../../actions/antitheft';

import AntitheftCard from "./AntitheftCard/AntitheftCard";
import Breadcrumbs from "../Breadcrumbs";

import './styles.scss';
import { LinkContainer } from "react-router-bootstrap";
import Filter from "./Filter/Filter";
import Paginate from "../Paginate/Paginate";
import LoginModal from "../Modals/LoginModal";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Antitheft = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [ filter, setFilter ] = useState({city: '', sort: 'new', amount: 0});
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const query = useQuery();
    const page = query.get('page') || 1;

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getAntitheftPosts(filter, 1));
    };
    const handleChange = (e) => {
        e.preventDefault();
        let val = e.target.value;
        if(e.target.name === 'amount' && e.target.value.length===0)
            val = 0;
        setFilter({...filter, [e.target.name]: val});
    };
    
    const openLoginModal = (e) =>{
        e.preventDefault();
        setShow(true);
    }

    return (
        <div id="antitheft">
            <LoginModal show={show} setShow={setShow} text="Подать объвления могут только зарегистрированные пользователи." />
            <div className="background">
                <div className="left-blur wrapper"></div>
                <Container>
                    <Breadcrumbs currentPage="Антиугон" />
                    <h1>Антиугон</h1>
                    <p>Поиск вашего угнанного автомобиля</p>
                    {user?.result ? (
                        <LinkContainer to="/antitheft/form">
                            <Button>Подать объявление</Button>
                        </LinkContainer>
                    ) : (
                        <Button onClick={openLoginModal} >Подать объявление</Button>
                    )}
                </Container>
            </div>
            <Container>
                <Filter handleFilter={handleFilter} handleChange={handleChange}/>
                <div className="posts">
                    {(isLoading || !posts) ? (
                        <div className="spinner">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : 
                    posts.length>0 ? (
                        <div className="cards">
                            {posts.map((post) => (
                                <AntitheftCard post={post} key={post._id}/>
                                ))}
                            </div>
                        ) : (
                            <div className="nothing">Не нашлось подходящих объявлении по вашему запросу. Попробуйте снова. </div>
                            )
                            
                        }
                    <Paginate page={Number(page)} filter={filter} type="antitheft"/>
                </div>
            </Container>
        </div>
    );
}

export default Antitheft;

