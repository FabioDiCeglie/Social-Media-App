import { GraphQLError } from "graphql";
import { Post } from "models/Post";

export const getUserPosts = async (args: { userId: string }) => {
  try {
    const { userId } = args;
    if (!userId) {
      return new GraphQLError(`Need ${userId} in arguments of the query!`);
    }
    const allPosts = await Post.find({ userId });
    return allPosts;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
