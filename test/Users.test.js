import axios from "axios";
import db from "../DB/database";
import { XMLHttpRequest } from "xmlhttprequest";

//global.XMLHttpRequest = XMLHttpRequest;

describe("Users resolvers", () => {
	test("createUser", async () => {
		const response = await axios.post("http://localhost:5000/graphql", {
			query: `
         mutation{
						createUser(userInput:{name:"chukwuka",email:"emichukwuka@gmail.com", password:"start12345"}){
							id
							name
							email
							password
						}
           }
      `,
		});

		const { data } = response;
		expect(data).toMatchObject({
			data: {
				createUser: {
					name: "chukwuka",
					email: "emichukwuka@gmail.com",
				},
			},
		});
	});
});
