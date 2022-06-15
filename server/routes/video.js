import express from 'express';

import { getVideos, likeVideo, getVideo, getRelatedVideos, commentVideo} from '../controllers/video.js';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getVideos);
router.get('/related', getRelatedVideos);
router.patch('/:id/like', auth, likeVideo);
router.get('/:id', getVideo);
router.post('/:id/comment', auth, commentVideo);

export default router;