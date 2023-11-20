"use strict";
import jwt from "jsonwebtoken";

const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
	host: "smtp.zoho.eu",
	secure: true,
	port: 465,
	auth: {
		user: "bara@writality.com",
		pass: "xpKcVvEC2yh6",
	},
});

export const emailToken = (email: string) => {
	const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
		expiresIn: "1d",
	});

	return token;
};

export const verifyEmailToken = (token: string) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

	// @ts-ignore
	return decoded.email;
};
