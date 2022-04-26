import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserLogbooks, deleteLogbook } from "../../../actions/logbook";

import './styles.scss';

const LogbookCard = ({logbook, update=false}) => {
    const dispatch = useDispatch();

    const deletePost = (e) => {
        e.preventDefault();

        dispatch(deleteLogbook(logbook._id));
        dispatch(getUserLogbooks());
    }

    useEffect(() => {
        const content = document.getElementById(`hidden${logbook._id}`);
        const imgs = [...content.getElementsByTagName('img')];
        // console.log(imgBlocks);
        // imgBlocks.map((img) => {
        //     document.getElementById(`imgs${logbook._id}`).appendChild(img);
        // })

        if(imgs.length > 0){
            document.getElementById(`mainimg${logbook._id}`).appendChild(imgs[0]);
            if(imgs.length === 1)
                document.getElementById(`imgs${logbook._id}`).style = 'display: none';
            for (let index = 1; index < imgs.length && index < 5; index++) {
                let imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container')
                imgContainer.appendChild(imgs[index]);

                if(index === 4 && imgs.length > 5){
                    let overlay = document.createElement('div');
                    overlay.classList.add('overlay')
                    overlay.innerHTML = `<h5>+ ${(Number(imgs.length) - Number(5))}</h5><p>фотографий</p>`;
                    imgContainer.appendChild(overlay);
                }

                document.getElementById(`imgs${logbook._id}`).appendChild(imgContainer);
            }
        }else{
            document.getElementById(`images${logbook._id}`).style = 'display: none';
        }

        const text = content.textContent;
        document.getElementById(`short${logbook._id}`).innerHTML = text;
    }, [logbook]);

    return (
        <Card className="logbook-card">
            <Card.Body>
                <Card.Header className="d-flex">
                    <div className="avatar avatar-md">
                        <Image src={logbook.author.avatar} />
                    </div>
                    <div>
                        {logbook.author.firstname} {logbook.author.lastname}
                    </div>
                    <div>
                        
                    </div>
                </Card.Header>
                <div className="images" id={`images${logbook._id}`}>
                    <div id={`mainimg${logbook._id}`} className="main-image"></div>
                    <div id={`imgs${logbook._id}`} className="other-images"></div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: logbook.message }} hidden id={`hidden${logbook._id}`}/>
                {/* <Card.Img variant="top" src={logbook.images[0]} /> */}
                <Card.Title>{logbook.title}</Card.Title>
                <Card.Text as="div">
                    <div id={`short${logbook._id}`}></div>
                    {update && (
                        <Button onClick={deletePost}>delete</Button>
                    )}
                </Card.Text>
            </Card.Body>
            {!update && (
                <Card.Footer>
                    <LinkContainer to={`/logbook/${logbook._id}`}>
                        <Button>Открыть</Button>
                    </LinkContainer>
                </Card.Footer>
            )}
        </Card>
    );
};

export default LogbookCard;