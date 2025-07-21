import { Router } from 'express';
import  { protect } from '../middleware/authMiddleware.js'
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/postController.js'

const router = Router()

router.post('/posts',protect, createPost);
router.get('/posts',protect, getAllPosts);
router.get('/posts/:id',protect, getSinglePost);
router.put('/posts/:id',protect, updatePost);
router.delete('/posts/:id',protect, deletePost);

export default router;