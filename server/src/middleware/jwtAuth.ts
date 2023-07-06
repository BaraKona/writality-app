const jwt = require("jsonwebtoken");

const verifyToken = (req: any, res: any, next: any) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.sendStatus(403);
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.userId = data.id;
		return next();
	} catch {
		return res.sendStatus(403);
	}
};

module.exports = verifyToken;
