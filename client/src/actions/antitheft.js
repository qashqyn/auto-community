import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getAntitheftPosts = (filter) => async(dispatch) => { 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchAntitheftPosts(filter);
        
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getAntitheftPost = (id) => async(dispatch) => { 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchAntitheftPost(id);
        
        dispatch({ type: FETCH_ONE, payload: data });
        dispatch({ type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createAntitheftPost = (post) => async(dispatch) => {
    try {
        console.log(post);
        const { data } = await api.createAntitheftPost(post);
        
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateAntitheftPost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updateAntitheftPost(id, post);
        
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteAntitheftPost = (id) => async(dispatch) => {
    try {
        await api.deleteAntitheftPost(id);
        
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeAntitheftPost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likeAntitheftPost(id);
        
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}