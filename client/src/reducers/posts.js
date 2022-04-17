import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE, FETCH_ONE, START_LOADING, END_LOADING } from "../constants/actionTypes";

const postsReducers = (state = {isLoading:true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case FETCH_ALL:
            return { ...state, posts: action.payload};
        case FETCH_ONE:
            return { ...state, post: action.payload };
        case CREATE:
            return {...state, posts: [ ...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case DELETE:
            return { ...state, posts : state.posts.filter((post) => post._id !== action.payload._id)};
        default:
            return state;
    }
}

export default postsReducers;