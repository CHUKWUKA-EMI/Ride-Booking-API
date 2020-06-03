import db from "./connection";

const firstRoute = `INSERT INTO "public"."Routes"(id,direction, duration, vehicle, cost) VALUES(gen_random_uuid(),'Lagos-Kano','10 hrs','Bus', 10000)`;
const secondRoute = `INSERT INTO "public"."Routes"(id,direction, duration, vehicle, cost) VALUES(gen_random_uuid(),'Lagos-Kaduna','8 hrs','Bus', 8000)`;
const thirdRoute = `INSERT INTO "public"."Routes"(id,direction, duration, vehicle, cost) VALUES(gen_random_uuid(),'Lagos-Ibadan','3 hrs','Sienna', 3000)`;
const fourthRoute = `INSERT INTO "public"."Routes"(id,direction, duration, vehicle, cost) VALUES(gen_random_uuid(),'Lagos-Abuja','6 hrs','Camry', 6000)`;
const fifthRoute = `INSERT INTO "public"."Routes"(id,direction, duration, vehicle, cost) VALUES(gen_random_uuid(),'Lagos-PortHarcourt','5 hrs','Sienna', 5000)`;

const query = [firstRoute, secondRoute, thirdRoute, fourthRoute, fifthRoute];

const addRoutes = () => {
	query.forEach(async (route) => {
		try {
			await db.query(route);
			console.log("Routes successfully added");
		} catch (err) {
			console.log("routes insert query", err);
		}
	});
};

const insertRoutes = async () => {
	await addRoutes();
};

insertRoutes();
