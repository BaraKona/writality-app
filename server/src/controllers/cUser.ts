import User from "../models/user/userSchema";

import { v4 as uuidv4 } from "uuid";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const createUser = async (req: any, res: any) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		console.log(name, email, password);
		return res.status(400).json({ message: "Please fill all fields" });
	}
	console.log(name, email, password);
	const encryptedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		name,
		email: email.toLowerCase(),
		uid: uuidv4(),
		password: encryptedPassword,
		createdAt: new Date(),
	});
	const userExists = await User.findOne({
		email: email,
	});
	if (userExists) {
		return res.status(409).json({ message: "User already exists" });
	}

	// Create token
	const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: 86400, // 24 hours
	});
	// save user token
	newUser.token = token;
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

export const signIn = async (req: any, res: any) => {
	const { email, password } = req.body;
	console.log(email, password);
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const passwordIsValid = await bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) {
			return res.status(401).json({
				accessToken: null,
				message: "Invalid Password!",
			});
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: 86400, // 24 hours
		});

		res
			.cookie("access_token", token, {
				httpOnly: true,
				secure: false,
				// expire in 3 days
				maxAge: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
			})
			.status(200)
			.json({
				uid: user.uid,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
