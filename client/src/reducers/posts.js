import { CREATE, DELETE, ADD_CAR, FETCH_ALL, LIKE, UPDATE, FETCH_ONE, START_LOADING, END_LOADING,CLEAR_STATE, SET_STATUS, FETCH_CARS } from "../constants/actionTypes";

const postsReducers = (state = {isLoading:true, posts: [] }, action) => {
    switch (action.type) {
        case CLEAR_STATE: 
            return {isLoading:true, posts: [], status: null };
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case ADD_CAR:
        case FETCH_CARS:
            return {...state, carModels: action.payload};
        case FETCH_ALL:
            return { ...state, posts: action.payload.data,  currentPage: action.payload?.currentPage, numberOfPages: action.payload?.numberOfPages};
        case FETCH_ONE:
            return { ...state, post: action.payload, status: null };
        case CREATE:
            return {...state, posts: [ ...state.posts, action.payload], status: action.payload?.status };
        case UPDATE:
        case LIKE:
            return { ...state, postLikes: action.payload};
        case DELETE:
            return { ...state, posts : state.posts.filter((post) => post._id !== action.payload)};
        case SET_STATUS:
            return {...state, status: action.payload.status};
        default:
            return state;
    }
}

export default postsReducers;