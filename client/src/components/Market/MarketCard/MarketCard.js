import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MarketCard = ({post}) => {
    return (
        <Card>
            <LinkContainer to={`/market/${post._id}`}>
                <Card.Body>
                    <Card.Img src={post?.imgs && post?.imgs[0]} />
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.location}</Card.Text>
                    <Card.Text className="cost">{post.cost} ₸</Card.Text>
                </Card.Body>
            </LinkContainer>
        </Card>
    );
};

export default MarketCard;