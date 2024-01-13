import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: Number(process.env.EMAIL_PORT || 465),
	secure: process.env.SMTP_TLS_ENABLED === "true",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export default transporter;
