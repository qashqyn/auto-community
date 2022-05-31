import { AUTH, RESET_PASSWORD, UPDATE_USER, CHANGE_PASSWORD } from '../constants/actionTypes';
import * as api from '../api';

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.signup(formData);

        dispatch({type: AUTH, payload: data});
        
        navigate(-1);
    } catch (error) {
        console.log(error);
    }
};

export const login = (formData) => async (dispatch) => {
    try {
        const data = await api.login(formData);

        dispatch({type: AUTH, payload: data});
        
    } catch (error) {
        console.log(error);
    }
};

export const edit = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.editUserInfo(formData);

        dispatch({type: UPDATE_USER, payload: data});

        navigate('/profile');
    } catch (error) {
        console.log(error);
    }
};

export const resetPassword = (email) => async (dispatch) => {
    try {
        const data = await api.resetPassword(email);
        dispatch({type: RESET_PASSWORD, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = (formData) => async (dispatch) => {
    try {
        const data = await api.changePassword(formData);
        dispatch({type: CHANGE_PASSWORD, payload: data});
    } catch (error) {
        console.log(error);
    }
}