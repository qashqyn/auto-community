import React from "react";
import moment from "moment";

import { Card, Button} from "react-bootstrap";

import './style.css';
// import { LinkContainer } from "react-router-bootstrap";

const Video = ({ video }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{video.title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Video;

