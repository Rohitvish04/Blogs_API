import { Router } from 'express';
import { getProfile, login, register, updateProfile }  from "../controllers/authController.js";
import { protect} from "../middleware/authMiddleware.js"

const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);
 

export default router