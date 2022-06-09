import { ADD_CAR, END_LOADING, FETCH_CARS, START_LOADING } from '../constants/actionTypes';
import * as api from '../api';

export const getCars = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchCarModels();
        dispatch({type: FETCH_CARS, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const addCar = (formData) => async (dispatch) => {
    try {
        const {data} = await api.addCarModel(formData);
        dispatch({type: ADD_CAR, payload: data});
    } catch (error) {
        console.log(error);
    }
}