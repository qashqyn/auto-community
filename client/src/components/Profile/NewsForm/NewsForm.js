import React, {useState} from "react";
import { Form, Button } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";

import { createNews } from '../../../actions/news';

const NewsForm = () => {
    const [newsData, setNewsData] = useState({creator: '', title: '', message:'', tags: '', selectedFile: '',});
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createNews(newsData));
        clear();
    };

    const clear = () => {
        setNewsData({creator: '', title: '', message:'', tags: '', selectedFile: '',});
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="creator">
                <Form.Label>Creator</Form.Label>
                <Form.Control type="text" onChange={(e) => setNewsData({ ...newsData, creator: e.target.value })} value={newsData.creator}></Form.Control>
            </Form.Group>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={(e) => setNewsData({ ...newsData, title: e.target.value })} value={newsData.title}></Form.Control>
            </Form.Group>
            <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" onChange={(e) => setNewsData({ ...newsData, message: e.target.value })} value={newsData.message}></Form.Control>
            </Form.Group>
            <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" onChange={(e) => setNewsData({ ...newsData, tags: e.target.value })} value={newsData.tags}></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId="file">
                <Form.Label>File</Form.Label>
                <Form.Control type="file" onChange={(e) => setNewsData({ ...newsData, tags: e.target.value })} value={newsData.tags}></Form.Control>
            </Form.Group> */}

            <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setNewsData({ ...newsData, selectedFile: base64 })}
            />
            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="secondary" onClick={clear}>Clear</Button>
        </Form>
    );
}

export default NewsForm;

