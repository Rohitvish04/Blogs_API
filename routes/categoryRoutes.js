import { Router } from "express";
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = Router();

router.post('/categories',isAdmin, createCategory);
router.get('/categories', getCategories);

export default router