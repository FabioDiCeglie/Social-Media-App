import { Request, Response } from "express";
import { GraphQLError } from "graphql";
import { Post } from "models/Post";

export const likePost = async (args: { id: string; userId: string }) => {
  try {
    const { id, userId } = args;
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
    return updatedPost;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
