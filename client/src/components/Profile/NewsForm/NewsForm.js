import React, {useEffect, useState} from "react";
import { Form, Button, Image, Modal } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";

import { createNews } from '../../../actions/news';

import Input from '../../SignUp/Input';
import NoImg from '../../../images/noimg.jpg';

import './styles.scss';
import { CLEAR_STATE } from "../../../constants/actionTypes";


const tagOptions = ["Тест-драйвы", "Путешествия", "Ремонт", "Покупка машины", "История", "Фотосессии", "Новые модели", "Спорткары", "Электромобили", "Безопасность", "Обучение", "Шины и диски"];

const NewsForm = () => {
    const [newsData, setNewsData] = useState({creator: '', title: '', message:'', tags: '', selectedFile: NoImg,});
    const dispatch = useDispatch();
    const {status} = useSelector((state) => state.posts);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createNews(newsData));
    };

    const handleChange = (e) => {
        setNewsData({...newsData, [e.target.name]: e.target.value});
    }

    const clear = () => {
        setNewsData({creator: '', title: '', message:'', tags: '', selectedFile: NoImg,});
        dispatch({type: CLEAR_STATE});
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
            <Form onSubmit={handleSubmit} id="newsForm">
                <h1>Добавить статью</h1>
                <Input name="title" label="Заголовок статьи" value={newsData.title} type="text" handleChange={handleChange}/>
                <Input name="subtitle" label="Подзаголовок статьи" value={newsData.subtitle} type="text" handleChange={handleChange}/>
                <Input name="tag" label="Тег" type="select" value={newsData.tag} options={tagOptions} handleChange={handleChange} />
                <Input name="message" label="Содержание статьи" value={newsData.message} type="textarea" handleChange={handleChange}/>
                <div id="newsImage">
                    <label>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setNewsData({ ...newsData, selectedFile: base64 })}
                        />
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 0H0V18H18V0Z" fill="white" fillOpacity="0.01"/>
                            <path d="M1.99619 16.3121L5.17808 16.3121L16.8453 4.64486L13.6634 1.46289L1.99609 13.1301L1.99619 16.3121Z" stroke="white" strokeWidth="1.2"/>
                            <path d="M10.4824 4.64453L13.6644 7.82652" stroke="white" strokeWidth="1.2"/>
                        </svg>
                    </label>
                    <Image src={newsData.selectedFile}/>
                </div>
                <Button variant="primary" type="submit">Опубликовать</Button>
            </Form>
        </>
    );
}

export default NewsForm;

