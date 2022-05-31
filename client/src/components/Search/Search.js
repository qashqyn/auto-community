import React from 'react';

import {Button, Form} from 'react-bootstrap';
import './styles.scss';

const Search = ({text, handleChange, handleSubmit}) => {
    return (
        <div id="search">
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder='Поиск по ключевым словам' name="search" value={text} onChange={handleChange} />
                <Button type='submit'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 0H0V22H22V0Z" fill="white" fillOpacity="0.01"/>
                        <path d="M9.62492 17.4173C13.9281 17.4173 17.4166 13.9289 17.4166 9.62565C17.4166 5.32245 13.9281 1.83398 9.62492 1.83398C5.32172 1.83398 1.83325 5.32245 1.83325 9.62565C1.83325 13.9289 5.32172 17.4173 9.62492 17.4173Z" stroke="#333333" strokeWidth="1.6" strokeLinejoin="round"/>
                        <path d="M15.2266 15.2266L19.1157 19.1157" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Button>
            </Form>
        </div>
    );
}

export default Search;