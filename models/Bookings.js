import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../DB/connection";

export default sequelize.define(
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
			defaultValue: false,
		},
		updatedAt: {
			field: "updated_at",
			type: Sequelize.DATE,
			defaultValue: false,
		},
	},
	{ timestamps: true }
);
