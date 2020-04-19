import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../DB/connection";

export default sequelize.define("Bookings", {
	id: {
		type: Sequelize.UUID,
		allowNull: false,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
		unique: true,
	},
	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
});
