import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// NEWS
export const fetchSingleNews = (id) => API.get(`/news/${id}`);
export const fetchNews = (tags, page) => API.get(`/news?tags=${tags.join()}&page=${page}`);
export const createNews = (newNews) => API.post(`/admin/news`, newNews);
export const updateNews = (id, updatedNews) => API.patch(`/admin/news/${id}`, updatedNews);
export const deleteNews = (id) => API.delete(`/admin/news/${id}`);
export const likeNews = (id) => API.patch(`/news/${id}/likeNews`);
// ANTITHEFT
export const fetchAntitheftPost = (id) => API.get(`/antitheft/${id}`);
export const fetchAntitheftPosts = (filter, page) => API.get(`/antitheft/?city=${filter.city}&sort=${filter.sort}&amount=${filter.amount}&page=${page}`);
export const createAntitheftPost = (newPost) => API.post(`/antitheft`, newPost);
export const updateAntitheftPost = (id, updatedPost) => API.patch(`/antitheft/${id}`, updatedPost);
export const deleteAntitheftPost = (id) => API.delete(`/antitheft/${id}`);
export const likeAntitheftPost = (id) => API.patch(`/antitheft/${id}/like`);
// VIDEOS
export const fetchVideos = (tags, page) => API.get(`/video?tags=${tags.join()}&page=${page}`);
export const fetchVideo = (id) => API.get(`/video/${id}`);
export const createVideo = (newVideo) => API.post(`/admin/video`, newVideo);

export const login = (formData) => API.post('/user/login', formData);
export const signup = (formData) => API.post('/user/signup', formData);
export const editUserInfo = (formData) => API.patch('/user/edit', formData);

export const fetchUser = (id) => API.get(`/user/${id}`);