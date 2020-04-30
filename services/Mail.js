import nodemailer from "nodemailer";
import mailGun from "./credentials";

const transport = nodemailer.createTransport({
	service: "Mailgun",
	auth: {
		user: mailGun.MAILGUN_USER,
		pass: mailGun.MAILGUN_PASS,
	},
	tls: {
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
