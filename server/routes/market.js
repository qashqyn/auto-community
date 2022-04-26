import express from 'express';

import {createPost, getPosts, getPost} from '../controllers/market.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/',auth, createPost);

export default router;