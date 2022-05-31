import express from 'express';

import { signup, login, updateUser, resetPassword, changePassword } from '../controllers/user.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.patch('/edit', auth, updateUser);
router.post('/reset_pass', resetPassword);
router.post('/change_pass', changePassword);

export default router;