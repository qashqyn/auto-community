import express from 'express';

import { getPosts, likePost, getPost, createPost, updatePost, deletePost } from '../controllers/antitheft.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getPosts);
router.patch('/:id/like', auth, likePost);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', updatePost);
router.delete('/:id', auth, deletePost);

export default router;