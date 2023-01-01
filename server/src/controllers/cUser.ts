import User from "../models/userSchema";
const bcrypt = require("bcrypt");

export const createUser = async (req: any, res: any) => {
  const { name, email, uid } = req.body;
  const newUser = new User({
    name,
    email,
    uid,
  });
  // check if user already exists
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({
      message: "Something went wrong, we could not get you registered",
    });
  }
};

export const getUser = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ uid: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
