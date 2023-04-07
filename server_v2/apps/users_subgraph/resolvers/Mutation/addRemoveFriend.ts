import { Request, Response } from "express";
import { User } from "models/User";
import { getUserFriendsFormatted } from "lib/helpers";
import { IUser } from "lib/types";

export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user) {
      return res.status(400).json({ msg: `User: ${user} does not exist` });
    }
    if (!friend) {
      return res
        .status(400)
        .json({ msg: `User friend ${friend} does not exist` });
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

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};
