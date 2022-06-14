import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserLogbooks, deleteLogbook } from "../../../actions/logbook";

import './styles.scss';
import NoImg from '../../../images/noimg.jpg';

const LogbookCard = ({logbook, update=false, isAuthor=false}) => {
    const dispatch = useDispatch();

    const deletePost = (e) => {
        e.preventDefault();

        dispatch(deleteLogbook(logbook._id));
        dispatch(getUserLogbooks());
    }
    const [ isLiked, setLiked ] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    const likePost = (e) => {
        e.preventDefault();
        setLiked(!isLiked);
    }

    const [images, setImages] = useState([]);
    const [imgCnt, setImgCnt] = useState(0);

    useEffect(() => {
        if(!!logbook){
            if(!!user && !!user.result && !!user.result._id && !!logbook.likes && logbook.likes>0 && logbook.likes.includes(user.result._id)){
                setLiked(true);
            }  

            const content = document.getElementById(`hidden${logbook._id}`);
            if(content){
                const els = content.getElementsByTagName('img');
                if(els && els.length > 0){
                    const imgs = [...els];
                    setImgCnt(imgs.length);

                    for (let index = 0; index < imgs.length && index < 5; index++) {
                        setImages((old) => [...old, imgs[index].src]);
                    }

                    // if(imgs.length > 0){
                    //     document.getElementById(`mainimg${logbook._id}`).appendChild(imgs[0]);
                    //     if(imgs.length === 1)
                    //         document.getElementById(`imgs${logbook._id}`).style = 'display: none';
                    //     for (let index = 1; index < imgs.length && index < 5; index++) {
                    //         let imgContainer = document.createElement('div');
                    //         imgContainer.classList.add('img-container')
                    //         imgContainer.appendChild(imgs[index]);

                    //         if(index === 4 && imgs.length > 5){
                    //             let overlay = document.createElement('div');
                    //             overlay.classList.add('overlay')
                    //             overlay.innerHTML = `<h5>+ ${(Number(imgs.length) - Number(5))}</h5><p>фотографий</p>`;
                    //             imgContainer.appendChild(overlay);
                    //         }

                    //         document.getElementById(`imgs${logbook._id}`).appendChild(imgContainer);
                    //     }
                    // }else{
                    //     document.getElementById(`images${logbook._id}`).style = 'display: none';
                    // }

                    const text = content.textContent;
                    document.getElementById(`short${logbook._id}`).innerHTML = text;
                }
            }
        }
    }, [logbook]);

    return logbook && (
        <Card className="logbook-card">
            <Card.Body>
                {(!isAuthor && logbook.author) && (
                    <Card.Header>
                        <div className="avatar avatar-sm">
                            <Image src={logbook.author.avatar ? logbook.author.avatar : NoImg} />
                        </div>
                        <div>
                            <div className="author-info">
                                {logbook.author?.firstname} {logbook.author?.lastname}
                            </div>
                            <div className="author-car">
                                {(logbook.author.cars && logbook.author.cars[0]) ? (`Я езжу на ${logbook.author.cars[0].mark} ${logbook.author.cars[0].model} ${logbook.author.cars[0].generation}`) : ('У меня нет машины')}
                            </div>
                        </div>
                    </Card.Header>
                )}
                {(images && images.length > 0) && (
                    <div className="images">
                        <div className="main-image">
                            <Image src={images[0]} />
                        </div>
                        {imgCnt > 1 && (
                            <div className="other-images">
                                {images.map((image,key)=>
                                    key !== 0 && (
                                        <div className="img-container" key={key}>
                                            <Image src={image} />
                                            {(key === 4 && imgCnt > 5 )&& (
                                                <div className="overlay">
                                                    <h5>+ {(Number(imgCnt) - Number(5))}</h5><p>фотографий</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                )}
                {/* <div className="images" id={`images${logbook._id}`}>
                    <div id={`mainimg${logbook._id}`} className="main-image"></div>
                    <div id={`imgs${logbook._id}`} className="other-images"></div>
                </div> */}
                <div dangerouslySetInnerHTML={{ __html: logbook.message }} hidden id={`hidden${logbook._id}`}/>
                <Card.Title>{logbook.title}</Card.Title>
                <Card.Text as="div">
                    <div id={`short${logbook._id}`}></div>
                    {update && (
                        <Button onClick={deletePost}>delete</Button>
                    )}
                </Card.Text>
                {!update && (
                    <Card.Footer>
                        <div className="actions">
                            <div className="action" onClick={likePost}>
                                <div className="icon-container">
                                    {isLiked ? (
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0003 30C-13.75 9.73607 6.14811 -6.07988 14.6702 2.28609C14.7828 2.39609 14.8934 2.51009 15.0003 2.62809C15.1061 2.5102 15.2161 2.39678 15.3303 2.28809C23.8505 -6.08388 43.7505 9.73406 15.0003 30Z" fill="#457B9D"/>
                                        </svg>                                    
                                    ) : (
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0003 5.49608L13.6558 4.02208C10.5001 0.562095 4.7137 1.75609 2.62488 6.10608C1.64423 8.15207 1.42297 11.1061 3.21365 14.876C4.9387 18.506 8.52756 22.854 15.0003 27.59C21.473 22.854 25.0599 18.506 26.7869 14.876C28.5775 11.1041 28.3582 8.15207 27.3756 6.10608C25.2868 1.75609 19.5004 0.560095 16.3447 4.02008L15.0003 5.49608ZM15.0003 30C-13.75 9.73607 6.14812 -6.07988 14.6702 2.28609C14.7828 2.39609 14.8934 2.51009 15.0003 2.62809C15.1061 2.5102 15.2161 2.39678 15.3303 2.28809C23.8505 -6.08388 43.7505 9.73407 15.0003 30Z" fill="black"/>
                                        </svg>
                                    )}
                                </div>
                                {logbook.likes && logbook.likes.length}
                            </div>
                        </div>
                        <LinkContainer to={`/logbook/${logbook._id}`}>
                            <Button>Открыть</Button>
                        </LinkContainer>
                    </Card.Footer>
                )}
            </Card.Body>
        </Card>
    );
};

export default LogbookCard;