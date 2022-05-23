import React from "react";
import moment from "moment";

import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import './styles.scss';
import NoImg from '../../../images/noimg.jpg';

const AntitheftCard = ({ post }) => {
    return (
        <LinkContainer to={`/antitheft/${post._id}`}>
            <Card className="antitheft-card">
                <Card.Body>
                    <div className="antitheft-card-img">
                        <Card.Img variant="left" src={post.selectedFiles?.length > 0 ? post.selectedFiles[0] : NoImg} />
                    </div>
                    <div className="info">
                        <Card.Title>{post.mark} {post.model} {(new Date(post.releaseYear).getFullYear())}</Card.Title>
                        <Card.Text>
                            <span>Сумма вознаграждения: <span>{post.amount} ₸</span></span>
                            <span>Город: <span>{post.location}</span></span>
                            <span>Гос.номер: <span>{post.stateNumber}</span></span>
                            <span className="date">{moment(post.createdAt).format("DD-MM-YYYY")}</span>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default AntitheftCard;

