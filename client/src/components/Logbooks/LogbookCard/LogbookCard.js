import React, { useEffect, useState } from "react";
import { Button, Card, Image, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserLogbooks, deleteLogbook } from "../../../actions/logbook";
import moment from "moment";

import './styles.scss';
import NoImg from '../../../images/noimg.jpg';
import Likes from "../../Likes";
import SubscribeBtn from "../../Subscribe/SubscribeBtn";
import CommentsSection from "../../CommentsSection/CommentsSection";

const LogbookCard = ({user = null, logbook, update=false, isAuthor=false}) => {
    const dispatch = useDispatch();

    const deletePost = (e) => {
        e.preventDefault();

        dispatch(deleteLogbook(logbook._id));
        dispatch(getUserLogbooks());
    }

    const [images, setImages] = useState([]);
    const [imgCnt, setImgCnt] = useState(0);

    const [show, setShow] = useState(false); 
    const openDeleteModal = () => setShow(true);
    const closeDeleteModal = () => setShow(false);


    useEffect(() => {
        if(!!logbook){

            const content = document.getElementById(`hidden${logbook._id}`);
            if(content){
                const els = content.getElementsByTagName('img');
                if(els && els.length > 0){
                    const imgs = [...els];
                    setImgCnt(imgs.length);

                    for (let index = 0; index < imgs.length && index < 5; index++) {
                        setImages((old) => [...old, imgs[index].src]);
                    }
                }
                if(!isAuthor){
                    const text = content.textContent;
                    document.getElementById(`short${logbook._id}`).innerHTML = text;
                }
            }
        }
    }, [logbook]);

    const [more, setMore] = useState(false);

    const readMore = (e) => {
        e.preventDefault();
        setMore(true);
        setImages(null);
    }

    return logbook && (
        <Card className="logbook-card">
            <Modal show={show} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить пост</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Удалить пост "{logbook.title}" ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeDeleteModal}>Отмена</Button>
                    <Button onClick={deletePost}>Удалить</Button>
                </Modal.Footer>
            </Modal>
            <Card.Body className={isAuthor && 'author'}>
                {(!isAuthor && logbook.author) && (
                    <Card.Header>
                        <div>
                            <div className="avatar avatar-sm">
                                <Image src={logbook.author.avatar ? logbook.author.avatar : NoImg} />
                            </div>
                            <div>
                                <LinkContainer to={`/profile/${logbook.author._id}`}>
                                    <div className="author-info">
                                        {logbook.author?.firstname} {logbook.author?.lastname}
                                    </div>
                                </LinkContainer>
                                <div className="author-car">
                                    {(logbook.author.cars && logbook.author.cars[0]) ? (`Я езжу на ${logbook.author.cars[0].mark} ${logbook.author.cars[0].model} ${logbook.author.cars[0].generation}`) : ('У меня нет машины')}
                                </div>
                            </div>
                        </div>
                        <SubscribeBtn otherUserId={logbook.author._id} user={user} btnFilled={false} />
                    </Card.Header>
                )}
                {isAuthor ? (
                    <Card.Img src={(images && images.length>0) ? images[0] : NoImg} />
                ) : ((images && images.length > 0) && (
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
                ))}
                {/* <div className="images" id={`images${logbook._id}`}>
                    <div id={`mainimg${logbook._id}`} className="main-image"></div>
                    <div id={`imgs${logbook._id}`} className="other-images"></div>
                </div> */}
                <div>
                    <Card.Title>{logbook.title}</Card.Title>
                    <div dangerouslySetInnerHTML={{ __html: logbook.message }} className="card-text" hidden={!more} id={`hidden${logbook._id}`}/>
                    <Card.Text as="div" hidden={more}>
                        {isAuthor ? (
                            <p className="category">Категория: <span>{logbook.category}</span></p>
                        ) : (
                            <>
                                <span id={`short${logbook._id}`}></span> <span className="readMore" hidden={!logbook.comments} onClick={readMore} >Читать дальше</span>
                            </>
                        )}
                    </Card.Text>
                </div>
                {(!update && logbook.comments) && (
                    <>
                        <CommentsSection shortComment={true} comments={logbook.comments} postId={logbook._id} type="logbook" />
                        <Card.Footer>
                            <div className="actions">
                                <Likes user={user} type="logbook" likes={logbook.likes} postId={logbook._id} />
                                <div className="action">
                                    <div className="icon-container">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M40 0H0V40H40V0Z" fill="white" fillOpacity="0.01"/>
                                            <path d="M40 0H0V40H40V0Z" fill="white" fillOpacity="0.01"/>
                                            <path d="M36.6668 5H3.3335V30H10.8335V34.1667L19.1668 30H36.6668V5Z" stroke="black" strokeWidth="1.6"/>
                                            <path d="M11.6665 16.25V18.75" stroke="black" strokeWidth="1.6"/>
                                            <path d="M20 16.25V18.75" stroke="black" strokeWidth="1.6"/>
                                            <path d="M28.3335 16.25V18.75" stroke="black" strokeWidth="1.6"/>
                                        </svg>
                                    </div>
                                    {logbook.comments.length}
                                </div>
                            </div>
                            <LinkContainer to={`/logbook/${logbook._id}`}>
                                <Button>Открыть</Button>
                            </LinkContainer>
                        </Card.Footer>
                    </>
                )}
                {isAuthor && (
                    <div className="admin-pan">
                        {update ? (
                            <div onClick={openDeleteModal}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0H0V18H18V0Z" fill="black" fillOpacity="0.01"/>
                                    <path d="M3.375 3.75V16.5H14.625V3.75H3.375Z" stroke="black"/>
                                    <path d="M7.5 7.5V12.375" stroke="black"/>
                                    <path d="M10.5 7.5V12.375" stroke="black"/>
                                    <path d="M1.5 3.75H16.5" stroke="black"/>
                                    <path d="M6 3.75L7.23337 1.5H10.7914L12 3.75H6Z" stroke="black"/>
                                </svg>
                            </div>
                        ) : (
                            <p className="date">{moment(logbook.createdAt).format("DD.MM.YYYY")}</p>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default LogbookCard;