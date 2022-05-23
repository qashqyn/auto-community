import express from 'express';

import { createNews, updateNews, deleteNews, createVideo, updateVideo, deleteVideo, getAntitheftPosts, setAntitheftStatus } from '../controllers/admin.js';

const router = express.Router();
// news
router.post('/news/', createNews);
router.patch('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);
// videos
router.post('/video/', createVideo);
router.patch('/video/:id', updateVideo);
router.delete('/video/:id', deleteVideo);
// antitheft
router.get('/antitheft', getAntitheftPosts);
router.get('/antitheft/:id', setAntitheftStatus);


export default router;