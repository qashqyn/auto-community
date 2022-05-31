import { FETCH_ALL_VIDEO, CREATE_VIDEO, UPDATE_VIDEO, DELETE_VIDEO, LIKE_VIDEO, START_LOADING, END_LOADING, FETCH_ONE_VIDEO, FETCH_RELATED_VIDEO } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getVideos = (tags, page) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchVideos(tags, page);
        
        dispatch({ type: FETCH_ALL_VIDEO, payload: data });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getRelatedVideos = (formData) => async(dispatch) => {
    try {
        const { data}  = await api.fetchRelatedVideos(formData);
        
        dispatch({ type: FETCH_RELATED_VIDEO, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getVideo = (id) => async(dispatch) => { 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchVideo(id);

        dispatch({ type: FETCH_ONE_VIDEO, payload: data });
        dispatch({ type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createVideo = (video) => async(dispatch) => {
    try {
        const { data } = await api.createVideo(video);
        
        dispatch({ type: CREATE_VIDEO, payload: data });
    } catch (error) {
        console.log(error);
    }
}

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