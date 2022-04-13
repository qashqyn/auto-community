import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE, FETCH_SINGLE_NEWS, START_LOADING, END_LOADING } from "../constants/actionTypes";

export default (state = { isLoading: true, news: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case FETCH_ALL:
            return { ...state, news: action.payload};
        case FETCH_SINGLE_NEWS:
            return { ...state, singleNews: action.payload };
        case CREATE:
            return {...state, news: [ ...state.news, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, news: state.news.map((singleNews) => singleNews._id === action.payload._id ? action.payload : singleNews)};
        case DELETE:
            return { ...state, news : state.news.filter((singleNews) => singleNews._id !== action.payload._id)};
        default:
            return state;
    }
}