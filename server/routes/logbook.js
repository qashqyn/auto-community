import express from 'express';

import { createPost, deleteLogbook, likeLogbook, getLogbook, getPosts, getUserLogbooks,getPostsByCategory, getLikes, commentLogbook } from '../controllers/logbook.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/my/', auth, getUserLogbooks);
router.get('/category', getPostsByCategory);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.post('/:id/comment', auth, commentLogbook);
router.get('/:id/likes', getLikes);
router.patch('/:id/like', auth, likeLogbook);
router.get('/:id', getLogbook);
router.delete('/:id', auth, deleteLogbook);

export default router;