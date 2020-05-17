import { graphql } from "graphql";
import db from "../DB/connection";
import DB from "../DB/database";
import schema from "../graphql/schema/schema";
import userResolvers from "../graphql/resolvers/Users";
import bookingResolvers from "../graphql/resolvers/Bookings";
import axios from "axios";

describe("Users resolvers", () => {
	global.jestExpect = global.jestExpect;

	let userToken;

	beforeAll(async () => {
		DB.users.destroy({ truncate: true });
		const createUserMutation = `
			mutation {
			 createUser(userInput: { email:"emichukwukajustice@gmail.com", password:"start12345", name: "justice" }) {
				 id
			 }
			}
		`;
		const query = `
			query {
				login(email:"emichukwukajustice@gmail.com", password:"start12345"){
					token
				}
			}
	`;
		// create new user
		await graphql(schema, createUserMutation, userResolvers);

		// Login user
		const {
			data: {
				login: { token },
			},
		} = await graphql(schema, query, userResolvers);
		console.log(token, "token in beforeAll");
		userToken = token;
	});

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
		expect(email).toBe("emichukwuka@gmail.com");
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
		expect(login).toBeDefined();
	});

	it("should get all bookings", async () => {
		const query = `
		    query {
					bookings {
							id
							user_id
							trip
							completed
					}
        }
		`;
		const {
			data: {
				data: { bookings },
			},
		} = await axios({
			method: "post",
			url: "http://localhost:5000/graphql",
			data: {
				query,
			},
			headers: { Authorization: `Bearer ${userToken}` },
		});

		console.log(bookings, userToken);
		expect(bookings.length).toBe(0);
		// expect(bookings[0].completed).toBe(false);
	});

	xit("should book a ride", async () => {
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
		const Authorization = () => ({
			req: { headers: { Authorization: `Bearer ${userToken}` } },
		});
		const result = await graphql(
			schema,
			query,
			bookingResolvers,
			Authorization()
		);
		console.log(result);
		const { data } = result;
		expect(data.bookTrip).to.be.ok;
	});
});

afterAll((done) => {
	db.close();
	done();
});
