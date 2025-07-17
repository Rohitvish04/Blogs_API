import { Router } from 'express';
// import  { protect } from '../middleware/authMiddleware.js'
import { createPost, getAllPosts, getSinglePost } from '../controllers/postController.js'

const router = Router()

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getSinglePost);

export default router;