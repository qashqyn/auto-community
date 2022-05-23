import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Container, Image, Spinner } from "react-bootstrap";

import { getAntitheftPost } from "../../actions/antitheft";
import Breadcrumbs from "../Breadcrumbs";

import "./styles.scss";
import ImageCarousel from "../ImageCarousel";

const AntitheftDetails = () => {
    const { post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();    

    useEffect(() => {
        dispatch(getAntitheftPost(id));
    }, [id]);

    return (
        <Container className="antitheft" id="antitheftDetails">
            {(isLoading || !post) ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Breadcrumbs links={[{name:'Антиугон', link: '/antitheft'}]} currentPage={post.mark + " " + post.model + " " + (moment(post.releaseYear).format("YYYY"))} />
                    <div className="d-flex"> 
                        <div className="left">
                            <div className="heading">{post.mark + " " + post.model + " " + (moment(post.releaseYear).format("YYYY"))}</div>
                            <div className="details">
                                <p>Гос.номер: <span>{post.stateNumber}</span></p>
                                <p>VIN - номер: <span>{post.vin}</span></p>
                                <p>Цвет: <span></span>{post.color}</p>
                                <p>Место кражи: <span>{post.location}</span></p>
                                <p>Сумма вознаграждения: <span className="amount">{post.amount} ₸</span></p>
                            </div>
                            {post.specialMarks && (
                                <div className="special-marks">
                                    <h3>Особые отметки</h3>
                                    <p>{post.specialMarks}</p>
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
                                        <a href={"tel:"+post.author.tel}>{post.author.tel}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <ImageCarousel images={post.selectedFiles} />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default AntitheftDetails;

