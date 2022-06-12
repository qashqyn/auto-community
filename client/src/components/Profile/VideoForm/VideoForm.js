import React, {useEffect, useState} from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { createVideo } from '../../../actions/videos';

import Input from '../../SignUp/Input';

import getVideoId from 'get-video-id';

import './styles.scss';
import { CLEAR_STATE_VIDEO } from "../../../constants/actionTypes";


const tagOptions = ["Тест-драйвы", "Путешествия", "Ремонт", "Покупка машины", "История", "Фотосессии", "Новые модели", "Спорткары", "Электромобили", "Безопасность", "Обучение", "Шины и диски"];

const VideoForm = () => {
    const [videoData, setVideoData] = useState({title: '', tags: '', videoLink: ''});
    const dispatch = useDispatch();
    const {status} = useSelector((state) => state.videos);

    const handleSubmit = (e) => {
        e.preventDefault();

        const link = getVideoId(videoData.videoLink);
        if(link.service === 'youtube'){
            dispatch(createVideo({...videoData, videoID: link.id}));
            clear();
        }
    };

    const handleChange = (e) => {
        setVideoData({...videoData, [e.target.name]: e.target.value});
    }

    const clear = () => {
        setVideoData({title: '', tag: '', videoLink: ''});
        dispatch({type: CLEAR_STATE_VIDEO});
    };

    const [statusModal, setStatusModal] = useState(false);
    const [statusModalText, setStatusModalText] = useState({title: '', text: ''});
    useEffect(() => {
        console.log(status);
        if(status){
            switch(status){
                case 200:
                case 201:
                    setStatusModalText({title: 'Успех', text: 'Статья успешно добавлен.'})
                    break;
                default:      
                    setStatusModalText({title: 'Ошибка', text: 'Что-то пошло не так. Пожалуйста попробуйте позже.'})
                    break;
            }
            setStatusModal(true);
        }
    }, [status]);

    const closeStatusModal = () => {
        switch(status){
            case 200:
            case 201:
                clear();
                break; 
        }
        setStatusModal(false);
    }

    return (
        <>
            <Modal show={statusModal} onHide={closeStatusModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{statusModalText.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{statusModalText.text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeStatusModal} >OK</Button>
                </Modal.Footer>
            </Modal>
            <Form onSubmit={handleSubmit} id="videoForm">
                <h1>Добавить видео</h1>
                <Input name="title" value={videoData.title} label="Заголовок видео" type="text" handleChange={handleChange}/>
                <Input name="tag" value={videoData.tag} label="Тег" type="select" options={tagOptions} handleChange={handleChange} />
                <Input name="videoLink" value={videoData.videoLink} label="Ссылка на видео" type="text" handleChange={handleChange}/>
                <Button variant="primary" type="submit">Опубликовать</Button>
            </Form>
        </>
    );
}

export default VideoForm;