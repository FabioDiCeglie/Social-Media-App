import { GraphQLError } from "graphql";
import { verifyTokenContext } from "lib/helpers";
import { MyContext } from "lib/types";
import { User } from "models/User";

export const getUser = async (_: unknown,
  args: { id: string },
  contextValue: MyContext
) => {
  verifyTokenContext(contextValue);
  try {
    const { id } = args;

    const user = await User.findById(id);
    if (!user) {
      return new GraphQLError(`User: ${user} does not exist`);
    }

    return user;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
