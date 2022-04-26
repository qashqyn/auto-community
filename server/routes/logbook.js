import express from 'express';

import { createPost, deleteLogbook, getLogbook, getPosts, getUserLogbooks,getPostsByCategory } from '../controllers/logbook.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/my/', auth, getUserLogbooks);
router.get('/category', getPostsByCategory);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getLogbook);
router.delete('/:id', auth, deleteLogbook);

export default router;