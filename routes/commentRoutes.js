import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsWithReplies,
  getSingleComment,
  updateComment,
} from '../controllers/commentController.js';

const router = Router();

// Comments for a specific post
router.get('/posts/:postId/comments', getComments);
router.post('/posts/:postId/comments', protect, createComment);

// Single comment
router.get('/posts/:postId/comments/:commentId', getSingleComment);
router.put('/comments/:id', protect, updateComment);
router.delete('/comments/:id', protect, deleteComment);

// Replies for a comment
router.get('/comments/:id/replies', getCommentsWithReplies);

export default router;
