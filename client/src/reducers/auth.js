import { AUTH, CHANGE_PASSWORD, LIKED_POSTS, LOGOUT, MY_POSTS, RESET_PASSWORD, SUBSCRIBE, UPDATE_USER } from '../constants/actionTypes';

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
        case MY_POSTS:
            return {...state, myPosts: action.payload?.data};
        case LIKED_POSTS:
            return {...state, likedPosts: action.payload?.data};
        case SUBSCRIBE:
            return {...state, subs: action.payload.data};
        default:
            return state;
    }
};

export default authReducer;