import { Request, Response } from 'express';
import User from '../../models/User';

export const getUserById = async (req: Request, res: Response) => {
  try {
    console.log('Request Params:', req.params);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting user by ID:', error.message);
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req: Request | any, res: Response) => {
  try {
    console.log('Authenticated User:', req.user);
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting authenticated user:', error.message);
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error listing users:', error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
