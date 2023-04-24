import { genSalt, hash } from "bcrypt";
import { GraphQLError, GraphQLFieldResolver } from "graphql";
import { User } from "models/User";
import { upload } from "../..";

export const register: GraphQLFieldResolver<any, unknown> = async (
  _: unknown,
  args: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    picturePath: string;
    location: string;
    occupation: string;
  }
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = args;

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends: [],
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });
    upload.single("picture");
    const savedUser = await newUser.save();

    return savedUser;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
