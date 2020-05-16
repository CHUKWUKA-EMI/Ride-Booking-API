import { graphql } from "graphql";
import db from "../DB/connection";
import chai from "chai";
import schema from "../graphql/schema/schema";
import userResolvers from "../graphql/resolvers/Users";
import bookingResolvers from "../graphql/resolvers/Bookings";

describe("Users resolvers", () => {
	global.jestExpect = global.jestExpect;
	global.expect = chai.expect;

	it("should create users", async () => {
		const query = `
         mutation{
						createUser(userInput:{name:"chukwuka",email:"emichukwuka@gmail.com", password:"start12345"}){
							id
							name
							email
							password
						}
           }
			`;
		const result = await graphql(schema, query, userResolvers);
		const { data } = result;
		const { createUser } = data;
		const { email } = createUser;
		expect(email).to.equal("emichukwuka@gmail.com");
	});

	it("should login users", async () => {
		const query = `
		  query{
						login(email:"emichukwuka@gmail.com",password:"start12345"){
							userId
							token
							tokenExpiration
						}
      }
		`;
		const result = await graphql(schema, query, userResolvers);
		const { data } = result;
		const { login } = JSON.parse(JSON.stringify(data));
		//const { email } = login;
		expect(login).to.be.ok;
	});

	it("should book a ride", async (req) => {
		const query = `
		    mutation{
						bookTrip(routeId:"4346ca76-96fd-11ea-81e7-1458d0b9c001"){
								id
								user_id
								trip
								completed
						}
        }
		`;
		const result = await graphql(schema, query, bookingResolvers);
		console.log(result);
		const { data } = result;

		expect(data.bookTrip).to.be.ok;
		expect(data.bookTrip.completed).to.be.false;
	});
});

afterAll((done) => {
	db.close();
	done();
});
