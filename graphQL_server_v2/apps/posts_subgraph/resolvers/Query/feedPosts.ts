import { Request, Response } from "express";
import { Post } from "models/Post";

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};
