import { Response, Request } from "express";
import { User } from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user)
      return res.status(400).json({ msg: `User: ${user} does not exist` });

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {};

export const addRemoveFriend = async (req: Request, res: Response) => {};
