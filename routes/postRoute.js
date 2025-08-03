import { Router } from 'express';
import  { protect } from '../middleware/authMiddleware.js'
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/postController.js'
import upload from "../utils/multer.js";

const router = Router()

router.post('/posts',protect ,upload.single("thumbnail"),createPost);
router.get('/posts',getAllPosts);
router.get('/posts/:id', getSinglePost);
router.put('/posts/:id',protect, updatePost);
router.delete('/posts/:id',protect, deletePost);

export default router;