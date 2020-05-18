import db from "./connection";

// const trigger = `
//   CREATE TRIGGER before_insert_Routes
//   BEFORE INSERT on Routes
//   FOR EACH ROW
//   SET NEW.id = uuid();
// `;

const firstRoute = `INSERT INTO Routes(direction, duration, vehicle, cost) VALUES('Lagos-Kano','10 hrs','Bus', 10000)`;
const secondRoute = `INSERT INTO Routes(direction, duration, vehicle, cost) VALUES('Lagos-Kaduna','8 hrs','Bus', 8000)`;
const thirdRoute = `INSERT INTO Routes(direction, duration, vehicle, cost) VALUES('Lagos-Ibadan','3 hrs','Sienna', 3000)`;
const fourthRoute = `INSERT INTO Routes(direction, duration, vehicle, cost) VALUES('Lagos-Abuja','6 hrs','Camry', 6000)`;
const fifthRoute = `INSERT INTO Routes(direction, duration, vehicle, cost) VALUES('Lagos-PortHarcourt','5 hrs','Sienna', 5000)`;

const query = [firstRoute, secondRoute, thirdRoute, fourthRoute, fifthRoute];

const executeTrigger = async () => {
	try {
		await db.query(
			"CREATE TRIGGER before_insert_Routes BEFORE INSERT ON Routes" +
				" FOR EACH ROW BEGIN SET new.id = uuid();" +
				" END;"
		);
		console.log("Trigger successful");
	} catch (err) {
		console.log("Trigger query", err);
	}
};

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
	await executeTrigger();
	await addRoutes();
};

insertRoutes();
