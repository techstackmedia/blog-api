"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = require("../../controllers/Post");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.authMiddleware, Post_1.createPost);
router.get('/', Post_1.getPosts);
router.get('/:id', Post_1.getPostById);
router.put('/:id', auth_1.authMiddleware, Post_1.updatePost);
router.delete('/:id', auth_1.authMiddleware, Post_1.deletePost);
exports.default = router;
