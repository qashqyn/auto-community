import React, {useState} from "react";
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";

import { createVideo } from '../../../actions/videos';

import Input from '../../SignUp/Input';

import getVideoId from 'get-video-id';

import './styles.scss';


const tagOptions = ["Тест-драйвы", "Путешествия", "Ремонт", "Покупка машины", "История", "Фотосессии", "Новые модели", "Спорткары", "Электромобили", "Безопасность", "Обучение", "Шины и диски"];

const VideoForm = () => {
    const [videoData, setVideoData] = useState({title: '', tags: '', videoLink: ''});
    const dispatch = useDispatch();

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
    };

    return (
        <Form onSubmit={handleSubmit} id="videoForm">
            <h1>Добавить видео</h1>
            <Input name="title" label="Заголовок видео" type="text" handleChange={handleChange}/>
            <Input name="tag" label="Тег" type="select" options={tagOptions} handleChange={handleChange} />
            <Input name="videoLink" label="Ссылка на видео" type="text" handleChange={handleChange}/>
            <Button variant="primary" type="submit">Опубликовать</Button>
        </Form>
    );
}

export default VideoForm;