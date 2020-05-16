import express from "express";
import { json, urlencoded } from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import graphqlSchema from "./graphql/schema/schema";
import resolver from "./graphql/resolvers/index";
import db from "./DB/database";
import isAuth from "./middleware/Authorization";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(isAuth);

app.post("/verify", async (req, res, next) => {
	try {
		const { secretToken } = req.body;
		const user = await db.users.findOne({ secretToken: secretToken });
		if (!user) {
			return res.send("User not found");
		}
		user.verified = true;
		user.secretToken = "";
		await user.save();
		return res.send("user verified");
	} catch (err) {
		next(err);
	}
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: resolver,
		graphiql: true,
	})
);

//import "./DB/connection";
//db.sequelize.sync();

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});
