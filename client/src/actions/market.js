import * as api from '../api';
import { CREATE, END_LOADING, FETCH_ALL, FETCH_ONE, START_LOADING } from '../constants/actionTypes';

export const getMarketPosts = (page) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchMarketPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getMarketPost = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchMarketPost(id);

        dispatch({type: FETCH_ONE, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createMarketPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createMarketPost(post);
        
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}