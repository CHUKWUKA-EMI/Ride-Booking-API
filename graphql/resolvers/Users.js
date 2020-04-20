import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

				const user = await db.users.create({
					name: args.userInput.name,
					email: args.userInput.email,
					password: hashedPass,
					created_at: new Date().toDateString(),
					updated_at: new Date().toDateString(),
				});
				console.log(user.dataValues);
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
				{ user_id: user.id, email: user.email },
				"mySecretKey",
				{ expiresIn: "24h" }
			);

			return { user_id: user.id, token: token, tokenExpiration: 24 };
		} catch (err) {
			throw err;
		}
	},
};
