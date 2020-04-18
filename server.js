import express from "express";
import { json, urlencoded } from "express";
import graphqlHttp from "express-graphql";
import cors from "cors";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
	res.send("hello world");
});

import "./DB/connection";

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});
