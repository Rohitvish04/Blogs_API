import { Router } from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/categoryController.js';
import { isAdmin } from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/categories',protect, isAdmin, createCategory);
router.put('/categories/:id', protect, isAdmin, updateCategory);
router.delete('/categories/:id', protect, isAdmin, deleteCategory);

// 	Public access
router.get('/categories', getCategory);

export default router