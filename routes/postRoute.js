import { Router } from 'express';
// import  { protect } from '../middleware/authMiddleware.js'
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/postController.js'

const router = Router()

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getSinglePost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;