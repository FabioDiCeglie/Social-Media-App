import { addRemoveFriend } from "./Mutation/addRemoveFriend";
import { getUser } from "./Query/user";
import { getUserFriends } from "./Query/userFriends";

export const resolvers = {
  Query: {
    user: getUser,
    userFriends: getUserFriends,
  },
  Mutation: {
    addRemoveFriend: addRemoveFriend,
  },
};
