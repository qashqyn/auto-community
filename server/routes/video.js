import express from 'express';

import { getVideos, likeVideo, getVideo} from '../controllers/video.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getVideos);
router.patch('/:id/like', auth, likeVideo);
router.get('/:id', getVideo);

export default router;