import Sequelize from "sequelize";
import sequelize from "../DB/connection";

export default sequelize.define("Users", {
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
});
