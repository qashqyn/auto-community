import express from 'express';

import { getNews, likeNews} from '../controllers/news.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getNews);
router.patch('/:id/likeNews', auth, likeNews);

export default router;