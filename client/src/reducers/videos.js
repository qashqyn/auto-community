import { CREATE_VIDEO, DELETE_VIDEO, FETCH_ALL_VIDEO, LIKE_VIDEO, UPDATE_VIDEO, FETCH_ONE_VIDEO, START_LOADING, END_LOADING, FETCH_RELATED_VIDEO, CLEAR_STATE_VIDEO } from "../constants/actionTypes";

const videosReducers = (state = {isLoading:true, videos: [], status: null }, action) => {
    switch (action.type) {
        case CLEAR_STATE_VIDEO: 
            return {...state, isLoading:true, videos: [], status: null };
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case FETCH_ALL_VIDEO:
            return { ...state, videos: action.payload.data, currentPage: action.payload?.currentPage, numberOfPages: action.payload?.numberOfPages};
        case FETCH_RELATED_VIDEO:
            return { ...state, related: action.payload.related, videoCount: action.payload?.videoCount};
        case FETCH_ONE_VIDEO:
            return { ...state, video: action.payload };
        case CREATE_VIDEO:
            return {...state, videos: [ ...state.videos, action.payload], status: action.payload.status };
        case UPDATE_VIDEO:
        case LIKE_VIDEO:
            return { ...state, videos: state.videos.map((video) => video._id === action.payload._id ? action.payload : video)};
        case DELETE_VIDEO:
            return { ...state, videos : state.videos.filter((video) => video._id !== action.payload)};
        default:
            return state;
    }
}

export default videosReducers;