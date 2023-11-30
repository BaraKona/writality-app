import User from "../models/user/userSchema";
import Project from "../models/projectSchema";
import { emailToken, transporter, verifyEmailToken } from "../nodemailer";
import { v4 as uuidv4 } from "uuid";

import generateToken from "../middleware/jwtGenerateToken";
const bcrypt = require("bcrypt");

export const createUser = async (req: any, res: any) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: "Please fill all fields" });
	}
	const encryptedPassword = await bcrypt.hash(password, 10);

	const userExists = await User.findOne({
		email: email,
	});

	const nameExists = await User.findOne({
		name: name,
	});

	if (userExists) {
		return res.status(409).json({ message: "User already exists" });
	}

	if (nameExists) {
		return res.status(409).json({ message: "Username taken" });
	}

	const newUser = new User({
		name,
		email: email.toLowerCase(),
		uid: uuidv4(),
		password: encryptedPassword,
		createdAt: new Date(),
		role: "beta-tester",
	});

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
	const userId = req.user.uid;
	try {
		const user = await User.findOne({ uid: userId })
			.select("-password")
			.populate({
				path: "friends.user",
				select: "uid name",
			})
			.populate({
				path: "friends.chat",
				select: "users",
			});

		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getAllUsers = async (req: any, res: any) => {
	try {
		const users = await User.find({
			isPublic: true,
		})
			.select("uid name email createdAt country roles aboutMe role")
			.sort({ createdAt: -1 });

		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleUser = async (req: any, res: any) => {
	const userId = req.params.userId;
	try {
		const user = await User.findOne({ uid: userId }).select("-password");
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const updateUserData = async (req: any, res: any) => {
	const userId = req.user.uid;
	const {
		name,
		aboutMe,
		interests,
		country,
		roles,
		languages,
		primaryLanguage,
		isPublic,
	} = req.body;

	// update values that are supplied in the request body
	const updatedUser = {
		name,
		aboutMe,
		interests,
		country,
		roles,
		languages,
		primaryLanguage,
		isPublic,
	};

	try {
		const user = await User.findOneAndUpdate({ uid: userId }, updatedUser, {
			new: true,
		});
		res.status(200).json(user);
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
		res.status(500).json({ message: "Email or password is incorrect" });
	}
};

export const signOut = async (req: any, res: any) => {
	try {
		res.cookie("access_token", "", {
			path: "/",
			httpOnly: true,
			domain: process.env.DOMAIN ? process.env.DOMAIN : "",
			secure: process.env.COOKIES_SECURE,
			samesite: "strict",
			expires: new Date(0),
		});
		res.status(200).json({ message: "User logged out" });
	} catch (error) {
		throw new Error(
			"Something went wrong, we could not sign you out. Please try again later 😔"
		);
	}
};

export const addFavouriteProject = async (req: any, res: any) => {
	const { projectId } = req.body;
	const userId = req.user.uid;
	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { uid: userId, active: true },
					},
					uid: projectId,
				},
			],
		});
		if (!project) {
			res.status(404).json({ message: "Project not found." });
		} else {
			const user = await User.findOne({ uid: userId });
			if (!user) {
				res.status(404).json({ message: "User not found." });
			} else {
				if (user.favouriteProjects.includes(projectId)) {
					res.status(200).json({ message: "Project already favourited." });
				} else {
					user.favouriteProjects.push(projectId);

					await user.save();
					res.status(200).json({ message: "Project favourited successfully." });
				}
			}
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const removeFavouriteProject = async (req: any, res: any) => {
	const { projectId } = req.body;
	const userId = req.user.uid;
	try {
		const project = await Project.findOne({
			$or: [
				{ owner: userId, uid: projectId },
				{
					collaborators: {
						$elemMatch: { uid: userId, active: true },
					},
					uid: projectId,
				},
			],
		});
		if (!project) {
			res.status(404).json({ message: "Project not found." });
		} else {
			const user = await User.findOne({ uid: userId });
			if (!user) {
				res.status(404).json({ message: "User not found." });
			} else {
				if (!user.favouriteProjects.includes(projectId)) {
					res.status(200).json({ message: "Project not favourited." });
				} else {
					user.favouriteProjects = user.favouriteProjects.filter(
						(project: string) => project !== projectId
					);

					await user.save();
					res.status(200).json({ message: "Project removed successfully." });
				}
			}
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addbookmarks = async (req: any, res: any) => {
	const { url, type, name } = req.body;
	const userId = req.user.uid;

	const bookmark = {
		tabType: type,
		url,
		name,
	};

	try {
		const user = await User.findOne({ uid: userId });
		if (!user) {
			res.status(404).json({ message: "User not found." });
		} else {
			if (user.bookmarks.find((tab: any) => tab.url === url)) {
				res.status(200).json({ message: "Bookmark already added" });
			} else {
				user.bookmarks.push(bookmark);
				await user.save();
				res
					.status(200)
					.json({ message: `Added ${type} to bookmark`, bookmark });
			}
		}
	} catch (error) {
		res.status(404).json({ message: "Something went wrong" });
	}
};

export const removeBookmark = async (req: any, res: any) => {
	const { url } = req.body;
	const userId = req.user.uid;

	try {
		const user = await User.findOne({ uid: userId });
		if (!user) {
			res.status(404).json({ message: "User not found." });
		} else {
			if (!user.bookmarks.find((tab: any) => tab.url === url)) {
				res.status(200).json({ message: "Tab not bookmarked." });
			} else {
				user.bookmarks = user.bookmarks.filter((tab: any) => tab.url !== url);
				await user.save();
				res.status(200).json({ message: "Tab removed successfully.", url });
			}
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const sendVerificationEmail = async (req: any, res: any) => {
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404).json({ message: "User not found." });
		}

		if (user.emailVerified) {
			res.status(200).json({ message: "Email already verified." });
		}

		const token = emailToken(user.email);

		const mailOptions = {
			from: process.env.EMAIL,
			to: user.email,
			subject: `Hey ${user.name}, here is your verification link`,
			html: `<h1>Verify your Writality account</h1>
			<p>Click the link below to verify your email and get started</p>
			<a href="${process.env.PLATFORM_URL}/verify-email?token=${token}" target="_blank">Verify Email</a>
			<p>Thanks for joining Writality!</p>
			<p>Writality Team</p>`,
		};
		await new Promise((resolve, reject) => {
			transporter().sendMail(mailOptions, (err: any, info: any) => {
				if (err) {
					console.log(err);
				} else {
					resolve(info);
				}
			});
		});

		res.status(200).json({ message: "Email sent successfully." });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const verifyEmail = async (req: any, res: any) => {
	const { token } = req.body;

	try {
		const email = verifyEmailToken(token);

		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "User not found." });
		}

		user.emailVerified = true;

		await user.save();

		res.status(200).json({ message: "Email verified successfully." });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const completeOnboarding = async (req: any, res: any) => {
	const userId = req.user._id;
	const { aboutMe, interests, country, roles, languages, primaryLanguage } =
		req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404).json({ message: "User not found." });
		}

		user.aboutMe = aboutMe;
		user.interests = interests;
		user.country = country;
		user.roles = roles;
		user.languages = languages;
		user.primaryLanguage = primaryLanguage;
		user.isOnboardingCompleted = true;

		await user.save();

		res.status(200).json({ message: "Onboarding completed successfully." });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
