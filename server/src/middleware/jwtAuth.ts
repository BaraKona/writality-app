import jwt from "jsonwebtoken";
import User from "../models/user/userSchema";

export const protect = async (req: any, res: any, next: any) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		// @ts-ignore
		req.user = await User.findOne({ uid: decoded.userId }).select("-password");

		next();
	} catch (error) {
		return res.status(401).json({ message: "Not authorized, token failed" });
	}
};
