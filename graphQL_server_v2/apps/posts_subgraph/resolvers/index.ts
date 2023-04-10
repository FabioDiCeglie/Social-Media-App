import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper/resolverMap";
import { getUserPosts } from "./Query/userPosts";
import { getFeedPosts } from "./Query/feedPosts";
import { likePost } from "./Mutation/likePost";

export const resolvers: GraphQLResolverMap<unknown> = {
  Query: {
    feedPosts: getFeedPosts,
    userPosts: getUserPosts,
  },
  Mutation: {
    likePost: likePost,
  },
};
