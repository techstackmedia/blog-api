import { Request, Response } from 'express';
import Post from '../../models/Post';
import User from '../../models/User';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content, author } = req.body;

  console.log('Creating post with:', { title, content, author });

  try {
    const user = await User.findOne({ name: author });
    if (!user) {
      console.error(`User not found: ${author}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const newPost = new Post({ title, content, author: user._id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating post:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  console.log('Updating post with:', { id, title, content, author });

  try {
    const user = await User.findById(author);
    if (!user) {
      console.error(`User not found: ${author}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author: user._id },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating post:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting posts:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting post by ID:', error.message);
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error deleting post:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
