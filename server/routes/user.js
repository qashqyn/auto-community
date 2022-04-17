import express from 'express';

import { signup, login, updateUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.patch('/edit', auth, updateUser);

export default router;