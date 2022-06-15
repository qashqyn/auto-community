import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/', validateStatus: function (status) { return true } });

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
export const commentNews = (id, data) => API.post(`/news/${id}/comment`, data);
// ANTITHEFT
export const fetchAntitheftPost = (id) => API.get(`/antitheft/${id}`);
export const fetchAntitheftPosts = (filter, page) => API.get(`/antitheft/?city=${filter.city}&sort=${filter.sort}&amount=${filter.amount}&page=${page}`);
export const createAntitheftPost = (newPost) => API.post(`/antitheft`, newPost);
export const updateAntitheftPost = (id, updatedPost) => API.patch(`/antitheft/${id}`, updatedPost);
export const deleteAntitheftPost = (id) => API.delete(`/antitheft/${id}`);
export const likeAntitheftPost = (id) => API.patch(`/antitheft/${id}/like`);
// LOGBOOK
export const fetchLogbooks = (search) => API.get(`/logbooks?search=${search}`);
export const fetchLogbooksByCategory = (categories) => API.get(`/logbooks/category?category=${categories.join()}`);
export const createLogbook = (newPost) => API.post(`/logbooks`, newPost);
export const fetchLogbook = (id) => API.get(`/logbooks/${id}`);
export const fetchUserLogbooks = () => API.get(`/logbooks/my`);
export const deleteLogbook = (id) => API.delete(`/logbooks/${id}`);
export const likeLogbook = (id) => API.patch(`/logbooks/${id}/like`);
export const commentLogbook = (id, data) => API.post(`/logbooks/${id}/comment`, data);

// export const fetchLikes = (id) => API.get(`/logbooks/${id}/`)
// MARKET
export const fetchMarketPost = (id) => API.get(`/market/${id}`);
export const fetchMarketPosts = (page, search, category, suits,condition) => API.get(`/market/?page=${page}&search=${search}&category=${category}&suits=${suits}&condition=${condition}`);
export const createMarketPost = (newPost) => API.post(`/market`, newPost);
export const deleteMarketPost = (id) => API.delete(`/market/${id}`);

// VIDEOS
export const fetchVideos = (tags, page) => API.get(`/video?tags=${tags.join()}&page=${page}`);
export const fetchVideo = (id) => API.get(`/video/${id}`);
export const fetchRelatedVideos = (data) => API.get(`/video/related?id=${data.id}&count=${data.count}`);
export const deleteVideo = (id) => API.delete(`/admin/video/${id}`);
export const createVideo = (newVideo) => API.post(`/admin/video`, newVideo);
export const likeVideo = (id) => API.patch(`/video/${id}/like`);
export const commentVideo = (id, data) => API.post(`/video/${id}/comment`, data);
// USER
export const login = (formData) => API.post('/user/login', formData);
export const signup = (formData) => API.post('/user/signup', formData);
export const editUserInfo = (formData) => API.patch('/user/edit', formData);
export const resetPassword = (email) => API.post('/user/reset_pass', email);
export const changePassword = (formData) => API.post('/user/change_pass', formData);
export const fetchLikedPosts = () => API.get('/user/liked');
export const fetchMyPosts = () => API.get('/user/myposts');

export const fetchUser = (id) => API.get(`/user/${id}`);
export const subscribe = (id) => API.post(`/user/subscribe/${id}`);
export const fetchSubs = () => API.get('/user/subs');

// ADMIN
export const fetchAdminAntitheftPosts = (status) => API.get(`/admin/antitheft?status=${status}`);
export const setAdminAntitheftStatus = (id, status) => API.get(`/admin/antitheft/${id}?status=${status}`);
export const fetchCarModels = () => API.get('/admin/carmodels');
export const addCarModel = (formData) => API.post('/admin/carmodels/add', formData);