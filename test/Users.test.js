import jwt from "jsonwebtoken";
import { graphql } from "graphql";
import db from "../DB/connection";
import chai from "chai";
import schema from "../graphql/schema/schema";
import userResolvers from "../graphql/resolvers/Users";

describe("Users resolvers", () => {
	global.jestExpect = global.jestExpect;
	global.expect = chai.expect;

	it("should create users", async () => {
		process.env.NODE_ENV = "test";

		const query = `
         mutation{
						createUser(userInput:{name:"chukwuka",email:"emichukwuka@gmail.com", password:"start12345"}){
							id
							name
							email
							password
						}
           }
			`,
			result = await graphql(schema, query, userResolvers);
		const { data } = result;
		const { createUser } = data;
		const { email } = createUser;
		expect(email).to.equal("emichukwuka@gmail.com");
	});

	it("should login users", async () => {
		process.env.NODE_ENV = "test";

		const query = `
		  query{
						login(email:"emichukwuka@gmail.com",password:"start12345"){
							userId
							email
							token
							tokenExpiration
						}
      }
		`,
			result = await graphql(schema, query, userResolvers);
		const { data } = result;
		const { login } = JSON.parse(JSON.stringify(data));
		const { email } = login;
		expect(email).to.equal("emichukwuka@gmail.com");
	});
});

afterAll((done) => {
	db.close();
	done();
});
