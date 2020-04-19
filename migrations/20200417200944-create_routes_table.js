"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Routes", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUID,
				primaryKey: true,
				unique: true,
			},
			direction: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			duration: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			vehicles: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cost: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			//underscored: true,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Routes");
	},
};
