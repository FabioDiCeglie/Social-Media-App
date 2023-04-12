import { User } from "models/User";
import { getUserFriendsFormatted, verifyTokenContext } from "lib/helpers";
import { IUser, MyContext } from "lib/types";
import { GraphQLError } from "graphql";

export const getUserFriends = async (_: unknown,
  args: { id: string },
  contextValue: unknown
) => {
  verifyTokenContext(contextValue as MyContext);
  try {
    const { id } = args;

    const user = await User.findById(id);
    if (!user) {
      return new GraphQLError(`User: ${user} does not exist`);
    }

    const formattedFriends = getUserFriendsFormatted(user as IUser);

    return formattedFriends;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
