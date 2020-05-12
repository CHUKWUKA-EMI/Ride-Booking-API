import db from "../../DB/database";

export default {
	bookings: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("User not authenticated");
		}
		try {
			const bookings = await db.bookings.findAll({
				where: { user_id: req.userId },
			});
			console.log(bookings.dataValues);
			return bookings.map((booking) => {
				console.log(booking.dataValues);
				return {
					id: booking.dataValues.id,
					user_id: req.userId,
					trip: booking.dataValues.trip,
					completed: booking.dataValues.completed,
				};
			});
		} catch (err) {
			throw err;
		}
	},

	bookTrip: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("User not authenticated");
		}

		try {
			const fetchedRoutes = await db.routes.findOne({
				where: { id: args.routeId },
			});
			const booking = await db.bookings.create({
				user_id: req.userId,
				trip: fetchedRoutes.dataValues.direction,
				completed: req.body.completed ? req.body.completed : false,
			});

			return { ...booking.dataValues };
		} catch (err) {
			throw err;
		}
	},
	editTrip: async ({ bookingId, completed }, req, res) => {
		if (!req.isAuth) {
			throw new Error("User not Authenticated");
		}
		try {
			const booking = await db.bookings.findOne({ where: { id: bookingId } });
			booking.set("completed", completed);
			return booking.save();
		} catch (err) {
			throw err;
		}
	},
	deleteTrip: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("User not authenticated");
		}
		try {
			const deleted = await db.bookings.destroy({
				where: { id: args.bookingId },
			});
		} catch (err) {
			throw err;
		}
	},
	completedTrips: async ({ completed }, req) => {
		if (!req.isAuth) {
			throw new Error("User not authenticated");
		}
		try {
			const completedTrip = await db.bookings.findAll({
				where: { completed: completed },
			});
			return completedTrip.map((data) => {
				return { ...data.dataValues };
			});
		} catch (err) {
			throw err;
		}
	},
};
