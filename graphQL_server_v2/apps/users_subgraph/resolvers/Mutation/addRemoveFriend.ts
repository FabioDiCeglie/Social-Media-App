import { Request, Response } from "express";
import { User } from "models/User";
import { getUserFriendsFormatted } from "lib/helpers";
import { IUser } from "lib/types";
import { GraphQLError } from "graphql";

export const addRemoveFriend = async (args: {
  id: string;
  friendId: string;
}) => {
  try {
    const { id, friendId } = args;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user) {
      return new GraphQLError(`User: ${user} does not exist`);
    }
    if (!friend) {
      return new GraphQLError(`User friend ${friend} does not exist`);
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const formattedFriends = getUserFriendsFormatted(user as IUser);

    return formattedFriends;
  } catch (err) {
    return new GraphQLError(err as unknown as string);
  }
};
