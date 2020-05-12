"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			"Users",
			{
				id: {
					type: Sequelize.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
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
				verified: {
					type: Sequelize.BOOLEAN,
				},
				secretToken: {
					type: Sequelize.STRING,
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
			},
			{ timestamps: true }
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Users");
	},
};
