import express from 'express';

import { getNews, likeNews, getSingleNews, commentNews} from '../controllers/news.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getNews);
router.patch('/:id/likeNews', auth, likeNews);
router.post('/:id/comment', auth, commentNews);
router.get('/:id', getSingleNews);

export default router;