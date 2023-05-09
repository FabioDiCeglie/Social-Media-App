import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper/resolverMap";
import { addRemoveFriend } from "./Mutation/addRemoveFriend";
import { login } from "./Query/login";
import { getUser } from "./Query/user";

export const resolvers: GraphQLResolverMap<unknown> = {
  Query: {
    user: getUser,
    login: login,
  },
  Mutation: {
    addRemoveFriend: addRemoveFriend,
  },
};
