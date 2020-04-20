import db from "../../DB/database";

export default {
	bookings: async (args, req) => {
		// if (!req.user) {
		// 	throw new Error("User not authenticated");
		// }
		try {
			const bookings = await db.bookings.findAll({
				where: { user_id: "2bc68f33-125a-4928-8394-0781a20d2ea8" },
			});
			console.log(bookings.dataValues);
			//bookings.map((booking) => {
			// console.log(booking.dataValues);
			// return {
			// 	id: booking.id,
			// 	user_id: "2bc68f33-125a-4928-8394-0781a20d2ea8",
			// 	trip: booking.trip,
			// };
			//});
		} catch (err) {
			throw err;
		}
	},

	bookTrip: async (args, req) => {
		// if (!req.user) {
		// 	throw new Error("User not authenticated");
		// }

		try {
			const fetchedRoutes = await db.routes.findOne({
				where: { id: args.routeId },
			});
			const oneUser = db.users;
			const booking = await db.bookings
				.create({
					user_id: "2bc68f33-125a-4928-8394-0781a20d2ea8",
					trip: fetchedRoutes.dataValues.direction,
					createdAt: new Date().toDateString(),
					updatedAt: new Date().toDateString(),
				})
				.then((result) => {
					//console.log(result.dataValues);
					return oneUser
						.update(
							{ bookings: result.dataValues.direction },
							{ where: { id: result.dataValues.user_id } }
						)
						.then((user) => console.log(user));
				});

			//console.log(booking.dataValues);
			return { ...booking.dataValues };
		} catch (err) {
			throw err;
		}
	},
};
