import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Container, Row, Col, Spinner } from "react-bootstrap";

import { getRelatedVideos, getVideo } from "../../actions/videos";
import Breadcrumbs from "../Breadcrumbs";

import CommentsSection from "../CommentsSection/CommentsSection";

import "./styles.scss";
import Video from "../Videos/Video/Video";
import Likes from "../Likes";

const VideoDetails = () => {
    const { video, isLoading, related, videoCount } = useSelector((state) => state.videos);
    const dispatch = useDispatch();
    const { id } = useParams();    
    // const [count, setCount] = useState(4);

    const [ isFav, setFav ] = useState(false);
    // const {isLiked, isFav } = useSelector({false, false})

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(id){
            dispatch(getVideo(id));
            dispatch(getRelatedVideos({id: id, count: 4}));
        }
    }, [dispatch, id]);
    const favNews = (e) => {
        e.preventDefault();
        setFav(!isFav);
    }

    return (
        <Container id="video">
            <Breadcrumbs links={[{link: '/video', name: 'Видео'}]} currentPage={video?.title} />
            <Row>
                <Col xm={12} md={8}>
                    {(isLoading || !video) ? (
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <div>
                            <div  id="videoPlayer">
                                <iframe title={video.title} src={`https://www.youtube.com/embed/${video.videoID}?rel=0`} frameBorder="0" rel="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
                            </div>
                            <div className="heading">{video.title}</div>
                            <div className="actions">
                                <Likes likes={video.likes} user={user.result} type="video" postId={video._id} />
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
                                    {video.comments.length}
                                </div>
                                <div className="action" onClick={favNews}>
                                    <div className="icon-container">
                                        {isFav ? (
                                            <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 28.3332V1.6665H21V28.3332L11 23.4134L1 28.3332Z" fill="#457B9D" stroke="#457B9D" strokeWidth="1.6"/>
                                            </svg>
                                        ) : (
                                            <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 28.3332V1.6665H21V28.3332L11 23.4134L1 28.3332Z" stroke="black" strokeWidth="1.6"/>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <CommentsSection comments={video.comments} type="video" postId={video._id}/> 
                        </div>
                    )}
                </Col>
                <Col xm={12} md={4}>
                    {(videoCount && videoCount > 0 && related && related.length>0) ? (
                        <div>
                            {related.map((rv) => (
                                <Video video={rv} key={rv._id} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default VideoDetails;

