import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { User } from "models/User";

export const login: unknown = async (args: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password: newPassword } = args;

    const user = await User.findOne({ email: email });
    if (!user) return new GraphQLError(`User: ${user} does not exist`);

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (!isMatch) return new GraphQLError(`Invalid password!`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    const { password, ...rest } = user;

    return { token: token, rest };
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
