import { AUTH, CHANGE_PASSWORD, LOGOUT, RESET_PASSWORD, UPDATE_USER } from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {
    switch(action.type){
        case AUTH:
        case UPDATE_USER:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));        
                return { ...state, authData: action.payload?.data, status: action.payload.status};
            }
            return {...state, authData: null, status: action.payload?.status};
        case LOGOUT:
        case RESET_PASSWORD:
        case CHANGE_PASSWORD:
            localStorage.clear();

            return {...state, authData: null, status: action.payload?.status};
        default:
            return state;
    }
};

export default authReducer;