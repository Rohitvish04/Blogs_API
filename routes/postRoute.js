import {Router} from 'express';
import { createPost, getPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/posts', protect, createPost);
router.get('/posts', getPosts);

export default router