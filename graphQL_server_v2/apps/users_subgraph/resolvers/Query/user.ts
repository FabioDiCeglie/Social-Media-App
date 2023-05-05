import { GraphQLError } from "graphql";
import { getUserFriendsFormatted, verifyTokenContext } from "lib/helpers";
import { IUser, MyContext } from "lib/types";
import { User } from "models/User";

export const getUser: any = async (
  _: unknown,
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

    if (user.friends.length > 0) {
      const formattedFriends = await getUserFriendsFormatted(user as IUser);
      user.friends = formattedFriends;

      return user;
    }

    return user;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
