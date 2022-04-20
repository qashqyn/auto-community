import React from "react";
import moment from "moment";

import { Card } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import './style.scss';
// import { LinkContainer } from "react-router-bootstrap";

const Video = ({ video }) => {
    // const vid = 
    return (
        <Card className="video-card">
            <Card.Body>
                <LinkContainer to={`/video/${video._id}`}>
                    <Card.Img src={`https://i.ytimg.com/vi/${video.videoID}/maxresdefault.jpg`} />
                </LinkContainer>
                <LinkContainer to={`/video/${video._id}`}>
                    <Card.Title>{video.title}</Card.Title>
                </LinkContainer>
                <Card.Text>Опубликовано {moment(video.createdAt).fromNow(true)} назад</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Video;

