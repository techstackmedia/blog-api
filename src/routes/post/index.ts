import express from 'express';
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
} from '../../controllers/Post';
import { authMiddleware } from '../../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware,createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
   