import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "Mailgun",
	auth: {
		user: "postmaster@sandboxa9ab4638ee7d4702a642a4c9e95ae797.mailgun.org",
		pass: "2330e33bb42be141bc1c39569190fc0f-65b08458-0d9f7c0b",
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
