import jwt from "jsonwebtoken";

const generateToken = (res: any, userId: string) => {
	try {
		const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
			expiresIn: "30d",
		});

		res.cookie("access_token", token, {
			path: "/",
			domain: process.env.DOMAIN,
			httpOnly: true,
			secure: process.env.COOKIES_SECURE,
			sameSite: "strict",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
	} catch (error) {
		throw new Error(error.message);
	}
};

export default generateToken;
