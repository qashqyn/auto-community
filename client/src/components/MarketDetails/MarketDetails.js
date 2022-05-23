import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Container, Image, Spinner } from "react-bootstrap";

import { getMarketPost } from "../../actions/market";
import Breadcrumbs from "../Breadcrumbs";

import "./styles.scss";
import ImageCarousel from "../ImageCarousel";

const MarketDetails = () => {
    const { post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();    

    useEffect(() => {
        dispatch(getMarketPost(id));
    }, [id]);

    return (
        <Container className="market" id="marketDetails">
            {(isLoading || !post) ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Breadcrumbs links={[{name:'Магазин', link: '/market'}]} currentPage={post.title} />
                    <div className="d-flex"> 
                        <div className="left">
                            <div className="heading">{post.title}</div>
                            <div className="details">
                                <p>Город: <span>{post.location}</span></p>
                                <p>Производитель: <span>{post.manufactor}</span></p>
                                <p>Состояние: <span>{post.condition}</span></p>
                                {/* <p>Подходит для: <span>{post.suits}</span></p> */}
                                <p>Размещено: <span>{moment(post.createdAt).format('DD.MM.YYYY')}</span></p>
                                <p>Цена: <span className="amount">{post.cost} ₸</span></p>
                            </div>
                            {post.description && (
                                <div className="description">
                                    <h3>Дополнительная информация</h3>
                                    <p>{post.description}</p>
                                </div>
                            )}
                            <div className="author">
                                <h3>Владелец</h3>
                                <div className="d-flex">
                                    <div className="avatar avatar-sm">
                                        <Image src={post.author.avatar} />
                                    </div>
                                    <div>
                                        <p>{post.author.firstname + " " + post.author.lastname}</p>
                                        <a href={"tel:"+post.tel}>{post.tel}</a>
                                        <p>Whatsapp: <a href={"tel:"+post.whatsapp}>{post.whatsapp}</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <ImageCarousel images={post.imgs} />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default MarketDetails;

