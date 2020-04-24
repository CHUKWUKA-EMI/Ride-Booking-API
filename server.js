import express from "express";
import { json, urlencoded } from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import graphqlSchema from "./graphql/schema/schema";
import resolver from "./graphql/resolvers/index";
import isAuth from "./middleware/Authorization";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(isAuth);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: resolver,
		graphiql: true,
	})
);

import "./DB/connection";

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});
