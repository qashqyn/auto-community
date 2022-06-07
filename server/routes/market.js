import express from 'express';

import {createPost, getPosts, getPost, deletePost} from '../controllers/market.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getPost);
router.delete('/:id', auth, deletePost);
router.get('/', getPosts);
router.post('/',auth, createPost);

export default router;