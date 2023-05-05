import { GraphQLError } from "graphql";
import { verifyTokenContext } from "lib/helpers";
import { IPost, MyContext } from "lib/types";
import { Post } from "models/Post";

export const likePost = async (
  _: unknown,
  args: { id: string; userId: string },
  contextValue: unknown
) => {
  verifyTokenContext(contextValue as MyContext);
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

    const newLikes = [...(post?.likes as unknown as IPost["likes"])].map(
      ([id, status]: any) => ({
        id,
        status,
      })
    );
    // @ts-ignore
    return { ...updatedPost?._doc, likes: newLikes, id: updatedPost?._id };
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
