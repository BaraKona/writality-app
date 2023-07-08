import User from "../models/user/userSchema";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
const bcrypt = require("bcrypt");
import generateToken from "../middleware/jwtGenerateToken";

const tokenDuration = 86400; // 24 hours

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

	try {
		await newUser.save();
		generateToken(res, newUser.uid);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(409).json({
			message: "Something went wrong, we could not get you registered",
		});
	}
};

export const getUser = async (req: any, res: any) => {
	try {
		const user = {
			uid: req.user.uid,
			name: req.user.name,
			email: req.user.email,
			createdAt: req.user.createdAt,
		};

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
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const passwordIsValid = await bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) {
			return res.status(401).json({
				accessToken: null,
				message: "Invalid email or password!",
			});
		}

		generateToken(res, user.uid);
		res.status(200).json({
			uid: user.uid,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const signOut = async (req: any, res: any) => {
	// logout user and make cookie invalid
	try {
		res.cookie("access_token", "", {
			httpOnly: true,
			secure: process.env.COOKIES_SECURE,
			expires: new Date(0),
		});
		res.status(200).json({ message: "User logged out" });
		console.log("User logged out");
	} catch (error) {
		throw new Error(
			"Something went wrong, we could not log you out. Please try again later"
		);
	}
};
