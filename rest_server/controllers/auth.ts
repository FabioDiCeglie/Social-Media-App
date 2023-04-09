import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.ts";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

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
