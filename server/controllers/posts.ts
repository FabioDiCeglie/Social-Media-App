import { Request, Response } from "express";
import Post from "../models/Post.ts";
import { User } from "../models/User.ts";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: `User: ${user} does not exist` });
    }

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const allPosts = await Post.find();

    res.status(201).json(allPosts);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allPosts = await Post.find({ userId });
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};

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
