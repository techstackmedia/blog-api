import { Router } from 'express';
import { getUserById, getMe } from '../../controllers/user';
import { authMiddleware as authenticate } from '../../middleware/auth';
import { listUsers } from '../../controllers/user';

const router = Router();

router.get('/:id', authenticate, getUserById);
router.get('/me', authenticate, getMe);
router.get('/list', listUsers);

export default router;
