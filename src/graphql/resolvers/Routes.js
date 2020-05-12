import db from "../../DB/database";

export default {
	routes: async () => {
		try {
			const routes = await db.routes.findAll();
			return routes.map((route) => {
				return {
					id: route.dataValues.id,
					direction: route.dataValues.direction,
					duration: route.dataValues.duration,
					vehicle: route.dataValues.vehicle,
					cost: route.dataValues.cost,
				};
			});
		} catch (err) {
			throw err;
		}
	},
};
