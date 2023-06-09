import { GraphQLError } from "graphql";
import { verifyTokenContext } from "lib/helpers";
import { MyContext } from "lib/types";
import { Post } from "models/Post";

export const getUserPosts = async (_: unknown,
  args: { userId: string },
  contextValue: unknown
) => {
  verifyTokenContext(contextValue as MyContext);
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
