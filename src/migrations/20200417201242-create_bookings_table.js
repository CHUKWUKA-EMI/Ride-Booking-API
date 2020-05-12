"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			"Bookings",
			{
				id: {
					type: Sequelize.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
					unique: true,
				},
				user_id: {
					type: Sequelize.UUID,
					allowNull: false,
				},
				trip: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				completed: {
					type: Sequelize.BOOLEAN,
				},
				createdAt: {
					field: "created_at",
					type: Sequelize.DATE,
				},
				updatedAt: {
					field: "updated_at",
					type: Sequelize.DATE,
				},
			},
			{ timestamps: true }
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Bookings");
	},
};
