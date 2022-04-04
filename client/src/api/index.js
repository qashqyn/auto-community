import axios from 'axios';

const url = 'http://localhost:5000/';

export const fetchNews = () => axios.get(`${url}news`);
export const createNews = (newNews) => axios.post(`${url}admin/news`, newNews);
export const updateNews = (id, updatedNews) => axios.patch(`${url}admin/news/${id}`, updatedNews);
export const deleteNews = (id) => axios.delete(`${url}admin/news/${id}`);
export const likeNews = (id) => axios.patch(`${url}/${id}/likeNews`);