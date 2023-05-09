import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper/resolverMap";
import { getUserPosts } from "./Query/userPosts";
import { getPosts } from "./Query/feedPosts";
import { likePost } from "./Mutation/likePost";

export const resolvers: GraphQLResolverMap<unknown> = {
  Query: {
    posts: getPosts,
    userPosts: getUserPosts,
  },
  Mutation: {
    likePost: likePost,
  },
};
