import nodemailer from "nodemailer";
import GMAIL from "./config";

const transport = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: GMAIL.USER,
		pass: GMAIL.PASSWORD,
	},
	tls: {
		cipher: "sslv3",
		rejectUnauthorized: false,
	},
});
export default {
	sendEmail(from, to, subject, html) {
		return new Promise((resolve, reject) => {
			transport.sendMail({ from, subject, to, html }, (err, info) => {
				if (err) {
					reject(err);
				}
				resolve(info);
			});
		});
	},
};
