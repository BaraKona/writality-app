import User from "../models/userSchema";

export const createUser = async (req: any, res: any) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.methods.comparePassword(password, (err: any, isMatch: any) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
