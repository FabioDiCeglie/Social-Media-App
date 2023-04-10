import { Request, Response } from "express";
import { Post } from "models/Post";

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allPosts = await Post.find({ userId });
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};
