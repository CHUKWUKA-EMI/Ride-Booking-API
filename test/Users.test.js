import axios from "axios";
import { graphql } from "graphql";
import db from "../DB/database";
import chai from "chai";
import schema from "../graphql/schema/schema";
import userResolvers from "../graphql/resolvers/Users";
import { XMLHttpRequest } from "xmlhttprequest";

describe("Users resolvers", () => {
	global.jestExpect = global.jestExpect;
	global.expect = chai.expect;

	it("should create users", async () => {
		process.env.NODE_ENV = "development";

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

		expect(data.createUser).to.be.ok;
		const { email } = data.createUser;
		expect(email).to.equal("emichukwuka@gmail.com");
	});
});
