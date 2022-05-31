import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_ONE, START_LOADING } from "../constants/actionTypes";
import * as api from '../api';

export const getLogbooks = (search = '') => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchLogbooks(search);

        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getLogbooksByCategory = (categories) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchLogbooksByCategory(categories);

        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getUserLogbooks = () => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchUserLogbooks();

        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getLogbook = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchLogbook(id);

        dispatch({type: FETCH_ONE, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createLogbook = (post) => async(dispatch) => {
    try {
        console.log(post);
        const { data } = await api.createLogbook(post);

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteLogbook = (id) => async(dispatch) => {
    try {
        await api.deleteLogbook(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}