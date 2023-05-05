import { GraphQLError } from "graphql";
import { IPost, Like } from "lib/types";
import { Post } from "models/Post";

export const getFeedPosts: () => Promise<IPost[] | GraphQLError> = async () => {
  try {
    const allPosts = await Post.find();
    const formatPosts = allPosts.map((post) => {
      const newLikes = [...(post.likes as unknown as IPost["likes"])].map(
        ([id, status]: any) => ({
          id,
          status,
        })
      );
      // @ts-ignore
      return { ...post._doc, likes: newLikes, id: post._id };
    });

    return formatPosts;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
