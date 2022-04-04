import React from "react";
import moment from "moment";

import { Card, Button} from "react-bootstrap";

import './style.css';
import { LinkContainer } from "react-router-bootstrap";

const SingleNews = ({ news }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Img variant="top" src={news.selectedFile} />
                <Card.Subtitle>{news.tags[0]}&emsp;{moment(news.createdAt).format("DD/MM/YYYY")}</Card.Subtitle>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.message}</Card.Text>
                {/* <LinkContainer> */}
                    <Card.Link>Читать больше</Card.Link>
                {/* </LinkContainer> */}
            </Card.Body>
        </Card>
    );
}

export default SingleNews;

