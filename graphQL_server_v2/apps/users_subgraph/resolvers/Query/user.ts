import { GraphQLError } from "graphql";
import { User } from "models/User";

export const getUser = async (args: { id: string }) => {
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
