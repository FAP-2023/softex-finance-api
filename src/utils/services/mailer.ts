import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT || 465),
	secure: process.env.SMTP_TLS_ENABLED === "true",
	auth: {
		user: process.env.SMTP_USERNAME,
		pass: process.env.SMTP_PASSWORD,
	},
});

export default transporter;
