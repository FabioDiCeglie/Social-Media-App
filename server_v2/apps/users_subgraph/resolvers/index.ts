import { addRemoveFriend } from "./Mutation/addRemoveFriend";
import { login } from "./Query/login";
import { getUser } from "./Query/user";
import { getUserFriends } from "./Query/userFriends";

export const resolvers = {
  Query: {
    user: getUser,
    userFriends: getUserFriends,
    login: login,
  },
  Mutation: {
    addRemoveFriend: addRemoveFriend,
  },
};
