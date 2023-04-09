import { User } from "models/User";
import { Request, Response } from "express";
import { getUserFriendsFormatted } from "lib/helpers";
import { IUser } from "lib/types";

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: `User: ${user} does not exist` });
    }

    const formattedFriends = getUserFriendsFormatted(user as IUser);

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};
