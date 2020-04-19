"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUID,
				primaryKey: true,
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
			createdAt: {
				field: "created_at",
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				field: "updated_at",
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
