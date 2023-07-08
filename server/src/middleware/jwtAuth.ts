import jwt from "jsonwebtoken";
import User from "../models/user/userSchema";

export const protect = async (req: any, res: any, next: any) => {
	const token = req.cookies.access_token;
	console.log(token);
	if (!token) {
		return res.sendStatus(403);
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		// @ts-ignore
		req.user = await User.findOne({ uid: decoded.userId }).select("-password");

		next();
	} catch {
		return res.sendStatus(403);
	}
};
