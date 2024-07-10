"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostById = exports.getPosts = exports.updatePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../../models/Post"));
const User_1 = __importDefault(require("../../models/User"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    console.log('Creating post with:', { title, content, author });
    try {
        const user = yield User_1.default.findOne({ name: author });
        if (!user) {
            console.error(`User not found: ${author}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const newPost = new Post_1.default({ title, content, author: user._id });
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating post:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, author } = req.body;
    console.log('Updating post with:', { id, title, content, author });
    try {
        const user = yield User_1.default.findById(author);
        if (!user) {
            console.error(`User not found: ${author}`);
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const updatedPost = yield Post_1.default.findByIdAndUpdate(id, { title, content, author: user._id }, { new: true });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating post:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});
exports.updatePost = updatePost;
const getPosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error getting posts:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error getting post by ID:', error.message);
        }
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Post_1.default.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting post:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deletePost = deletePost;
