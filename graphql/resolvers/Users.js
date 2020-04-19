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
				});
				console.log(user.dataValues);
				return user;
			}
		} catch (err) {
			throw err;
		}
	},

	login: async (args) => {
		console.log(args.email);
		try {
			const user = await db.users.findOne({
				where: { email: args.email },
			});
			if (!user) {
				throw new Error("User not found!");
			}
			const isValidPass = await bcrypt.compare(args.password, user.password);
			if (!isValidPass) {
				throw new Error("Invalid Password");
			}
			console.log(user.dataValues);
			const token = jwt.sign(
				{ user_id: user.id, email: user.email },
				"mySecretKey",
				{ expiresIn: "24hrs" }
			);
			//console.log(token);
			return { user_id: user.id, token: token, tokenExpiration: 24 };
		} catch (err) {
			throw err;
		}
	},
};
