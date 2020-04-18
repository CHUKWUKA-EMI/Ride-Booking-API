"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				unique: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				required: true,
			},
			bookings: {
				type: Sequelize.INTEGER,
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
		return queryInterface.dropTable("Users");
	},
};
