import Router from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createComment, deleteComment, getcomment, updateComment } from '../controllers/commentController.js'

const router = Router();

router.post('/comments',protect, createComment);
router.get('/comments',protect, getcomment);
router.put('/comments/:id', protect, updateComment);
router.delete('/comments/:id', protect, deleteComment);

export default router;