import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

export const fetchNews = () => API.get(`/news`);
export const createNews = (newNews) => API.post(`/admin/news`, newNews);
export const updateNews = (id, updatedNews) => API.patch(`/admin/news/${id}`, updatedNews);
export const deleteNews = (id) => API.delete(`/admin/news/${id}`);
export const likeNews = (id) => API.patch(`/news/${id}/likeNews`);

export const login = (formData) => API.post('/user/login', formData);
export const signup = (formData) => API.post('/user/signup', formData);

export const fetchUser = (id) => API.get(`/user/${id}`);