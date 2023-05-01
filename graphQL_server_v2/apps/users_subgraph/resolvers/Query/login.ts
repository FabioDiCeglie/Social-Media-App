import bcrypt from "bcrypt";
import { GraphQLError, GraphQLFieldResolver } from "graphql";
import jwt from "jsonwebtoken";
import { User } from "models/User";

export const login: GraphQLFieldResolver<any, unknown> = async (
  _: unknown,
  args: {
    email: string;
    password: string;
  }
) => {
  try {
    const { email: userEmail, password: newPassword } = args;

    const user = await User.findOne({ email: userEmail });
    if (!user) return new GraphQLError(`User: ${userEmail} does not exist`);

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (!isMatch) return new GraphQLError(`Invalid password!`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    const {
      id,
      firstName,
      lastName,
      email,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impressions,
    } = user;

    return {
      id,
      firstName,
      lastName,
      email,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      token,
      impressions,
    };
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
