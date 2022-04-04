import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionTypes";

export default (news = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...news, action.payload];
        case UPDATE:
        case LIKE:
            return news.map((singleNews) => singleNews._id === action.payload._id ? action.payload : singleNews);
        case DELETE:
            return news.filter((singleNews) => singleNews._id !== action.payload._id);
        default:
            return news;
    }
}