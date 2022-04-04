import express from 'express';

import { getNews, likeNews} from '../controllers/news.js';

const router = express.Router();

router.get('/', getNews);
router.patch('/:id/likeNews', likeNews);

export default router;