import Sequelize from "sequelize";
import sequelize from "../DB/connection";

export default sequelize.define("Routes", {
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
