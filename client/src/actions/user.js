import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, LIKED_POSTS, START_LOADING, END_LOADING, MY_POSTS, SUBSCRIBE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getUser = () => async(dispatch) => { 
    try {
        const { data } = await api.fetchUser();
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getLiked = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchLikedPosts();

        dispatch({type: LIKED_POSTS, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}
export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const data = await api.fetchMyPosts();

        dispatch({type: MY_POSTS, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}

export const subscribe = (id) => async (dispatch) => {
    try {
        const data = await api.subscribe(id);

        dispatch({type: SUBSCRIBE, payload: data});
    } catch (error) {
        console.log(error);
    }
} 
export const getSubs = () => async (dispatch) => {
    try {
        const data = await api.fetchSubs();

        dispatch({type: SUBSCRIBE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

// export const createNews = (news) => async(dispatch) => {
//     try {
//         const { data } = await api.createNews(news);
        
//         dispatch({ type: CREATE, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const updateNews = (id, news) => async(dispatch) => {
//     try {
//         const { data } = await api.updateNews(id, news);
        
//         dispatch({ type: UPDATE, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const deleteNews = (id) => async(dispatch) => {
//     try {
//         await api.deleteNews(id);
        
//         dispatch({ type: DELETE, payload: id });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const likeNews = (id, news) => async(dispatch) => {
//     try {
//         const { data } = await api.likeNews(id);
        
//         dispatch({ type: LIKE, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }