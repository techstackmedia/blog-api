import { Router } from 'express';
import { getUserById, getMe, listUsers } from '../../controllers/user';
import { authMiddleware as authenticate } from '../../middleware/auth';

const router = Router();

router.get('/me', authenticate, getMe);
router.get('/list', listUsers);
router.get('/:id', authenticate, getUserById); 

export default router;
