import { Friend, IUser } from "./types";
import { User } from "../models/User";

export const getUserFriendsFormatted = async (user: IUser) => {
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  const formattedFriends: Friend[] = friends.map((friend) => {
    const { id, firstName, lastName, occupation, location, picturePath } =
      friend as unknown as Friend;

    return { id, firstName, lastName, occupation, location, picturePath };
  });

  return formattedFriends;
};
