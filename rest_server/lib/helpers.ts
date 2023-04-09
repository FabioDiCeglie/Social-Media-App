import { User } from "../models/User";
import { Friend, IUser } from "./types";

export const getUserFriendsFormatted = async (user: IUser) => {
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  const formattedFriends: Friend[] = friends.map((friend) => {
    const { _id, firstName, lastName, occupation, location, picturePath } =
      friend as unknown as Friend;

    return { _id, firstName, lastName, occupation, location, picturePath };
  });

  return formattedFriends;
};
