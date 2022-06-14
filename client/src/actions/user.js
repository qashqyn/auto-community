import { LIKED_POSTS, START_LOADING, END_LOADING, MY_POSTS, SUBSCRIBE, FETCH_USER } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getUser = (id) => async(dispatch) => { 
    try {
        const { data } = await api.fetchUser(id);
        
        dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getLiked = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchLikedPosts();

        dispatch({type: LIKED_POSTS, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}
export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchMyPosts();

        dispatch({type: MY_POSTS, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}

export const subscribe = (id) => async (dispatch) => {
    try {
        const data = await api.subscribe(id);

        dispatch({type: SUBSCRIBE, payload: data});
    } catch (error) {
        console.log(error);
    }
} 
export const getSubs = () => async (dispatch) => {
    try {
        const data = await api.fetchSubs();

        dispatch({type: SUBSCRIBE, payload: data});
    } catch (error) {
        console.log(error);
    }
}