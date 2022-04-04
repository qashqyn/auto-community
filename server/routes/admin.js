import express from 'express';

import { createNews, updateNews, deleteNews } from '../controllers/admin.js';

const router = express.Router();

router.post('/news/', createNews);
router.patch('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);


export default router;