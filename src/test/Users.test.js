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
			 createUser(userInput: { email:"emichukukajustice@gmail.com", password:"start12345", name: "justice" }) {
				 id
			 }
			}
		`;
		const query = `
			query {
				login(email:"emichukukajustice@gmail.com", password:"start12345"){
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
		jest.setTimeout(30000);
	});

	it("should create users", async () => {
		const query = `
			mutation{
				createUser(userInput:{name:"chukwuka",email:"emichukuka@gmail.com", password:"start12345"}){
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
		expect(email).toBe("emichukuka@gmail.com");
	});

	it("should login users", async () => {
		const query = `
		  query{
				login(email:"emichukuka@gmail.com",password:"start12345"){
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

		expect(bookings.length).toBe(0);
	});

	it("should book a ride", async () => {
		const query = `
		    mutation{
						bookTrip(routeId:"ca208971-5af0-4a72-8d7f-c8f5c6f5645f"){
								id
								user_id
								trip
								completed
						}
	      }
		`;
		const result = await axios({
			method: "post",
			url: "http://localhost:5000/graphql",
			data: {
				query,
			},
			headers: { Authorization: `Bearer ${userToken}` },
		});
		expect(result.data.data.bookTrip.completed).toBe(false);
	});

	it("should edit a trip", async () => {
		const query = `
		  mutation{
				editTrip(bookingId:"a861bc57-b492-42fd-a145-48f1605b00c8",completed:true){
					id
					user_id
					trip
					completed
				}
    }
		`;
		const result = await axios({
			method: "post",
			url: "http://localhost:5000/graphql",
			data: {
				query,
			},
			headers: { Authorization: `Bearer ${userToken}` },
		});
		expect(result.data.data.editTrip.completed).toBe(true);
	});
	it("should get all completed trips", async () => {
		const query = `
		  query{
				completedTrips(completed:true){
					id
					completed
				}
     }
		`;
		const result = await axios({
			method: "post",
			url: "http://localhost:5000/graphql",
			data: {
				query,
			},
			headers: { Authorization: `Bearer ${userToken}` },
		});
		console.log(result.data.data);
		expect(result.data.data.completedTrips[0].completed).toBe(true);
	});
});

afterAll((done) => {
	db.close();
	done();
});
