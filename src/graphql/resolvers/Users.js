import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import randomString from "randomstring";

import db from "../../DB/database";

export default {
	createUser: async (args) => {
		try {
			const existingUser = await db.users.findOne({
				where: { email: args.userInput.email },
			});
			if (existingUser) {
				throw new Error("User already exists");
			} else {
				const hashedPass = await bcrypt.hash(args.userInput.password, 10);
				const token = jwt.sign(
					{ username: args.userInput.name, email: args.userInput.email },
					process.env.TOKEN_SECRET,
					{ expiresIn: "14d" }
				);

				// const html = `
				//     Hi ${args.userInput.name}
				//   <br />
				//   Thank you for registering with us
				// 	<br /><br />
				// 	To verify your account, type the following token:
				// 	<br />
				// 	Token: <b>${token}</b>
				// 	<br />
				// 	on the following page:
				// 	<a href="http://localhost:5000/verify">http://localhost:5000/verify</a>
				// 	<br /><br />
				// 	<b>Thank you</b>
				//   `;
				// await mailer
				// 	.sendEmail(
				// 		"emijustice@dev.com",
				// 		args.userInput.email,
				// 		"Verify your Email",
				// 		html
				// 	)
				// 	.then(() => {
				// 		console.log("mail sent");
				// 	});

				const user = await db.users.create({
					name: args.userInput.name,
					email: args.userInput.email,
					password: hashedPass,
					verified: false,
					secretToken: token,
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString(),
				});
				// console.log("newly created user", user.dataValues);
				return user;
			}
		} catch (err) {
			throw err;
		}
	},

	login: async ({ email, password }) => {
		try {
			const user = await db.users.findOne({
				where: { email: email },
			});
			if (!user) {
				throw new Error("User not found!");
			}
			const isValidPass = await bcrypt.compare(password, user.password);
			if (!isValidPass) {
				throw new Error("Invalid Password");
			}

			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				process.env.TOKEN_SECRET,
				{ expiresIn: "24h" }
			);

			return {
				userId: user.id,
				token: token,
				tokenExpiration: 24,
			};
		} catch (err) {
			throw err;
		}
	},
};
