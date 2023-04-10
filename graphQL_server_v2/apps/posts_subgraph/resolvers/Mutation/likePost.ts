import { Request, Response } from "express";
import { Post } from "models/Post";

export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post?.likes?.get(userId);

    if (isLiked) {
      post?.likes?.delete(userId);
    } else {
      post?.likes?.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post?.likes,
      },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};
