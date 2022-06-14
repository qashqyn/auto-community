import express from 'express';

import { signup, login, updateUser, resetPassword, changePassword, getLikedPosts, getMyPosts, subscribe, getSubs, getUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.patch('/edit', auth, updateUser);
router.post('/reset_pass', resetPassword);
router.post('/change_pass', changePassword);
router.get('/liked', auth, getLikedPosts);
router.get('/myposts', auth, getMyPosts);
router.post('/subscribe/:id', auth, subscribe);
router.get('/subs', auth, getSubs);
router.get('/:id', getUser);

export default router;