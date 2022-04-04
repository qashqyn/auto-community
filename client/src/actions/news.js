import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getNews = () => async(dispatch) => {
    try {
        const { data } = await api.fetchNews();
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createNews = (news) => async(dispatch) => {
    try {
        const { data } = await api.createNews(news);
        
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateNews = (id, news) => async(dispatch) => {
    try {
        const { data } = await api.updateNews(id, news);
        
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteNews = (id) => async(dispatch) => {
    try {
        await api.deleteNews(id);
        
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeNews = (id, news) => async(dispatch) => {
    try {
        const { data } = await api.likeNews(id);
        
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}