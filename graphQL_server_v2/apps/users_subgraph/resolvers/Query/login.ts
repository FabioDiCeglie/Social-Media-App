import { Request, Response } from "express";
import { User } from "models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password: newPassword } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ msg: `User: ${user} does not exist` });

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: `Invalid password!` });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    const { password, ...rest } = user;

    res.status(200).json({ token, user: rest });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
