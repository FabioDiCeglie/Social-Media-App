import { GraphQLError } from "graphql";
import { Post } from "models/Post";

export const getFeedPosts = async () => {
  try {
    const allPosts = await Post.find();
    return allPosts;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
