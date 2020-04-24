"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Routes", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			direction: {
				type: Sequelize.STRING,
			},
			duration: {
				type: Sequelize.STRING,
			},
			vehicle: {
				type: Sequelize.STRING,
			},
			cost: {
				type: Sequelize.FLOAT,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Routes");
	},
};
