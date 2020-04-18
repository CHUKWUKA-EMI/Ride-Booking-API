"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Bookings", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				unique: true,
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			//underscored: true,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Bookings");
	},
};
