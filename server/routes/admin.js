import express from 'express';

import { createNews, updateNews, deleteNews, createVideo, updateVideo, deleteVideo } from '../controllers/admin.js';

const router = express.Router();

router.post('/news/', createNews);
router.patch('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

router.post('/video/', createVideo);
router.patch('/video/:id', updateVideo);
router.delete('/video/:id', deleteVideo);


export default router;