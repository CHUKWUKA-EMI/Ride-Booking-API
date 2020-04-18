import Sequelize from "sequelize";
import sequelize from "../DB/connection";

export default sequelize.define("Routes", {
	id: {
		type: Sequelize.UUID,
		allowNull: false,
		defaultValue: Sequelize.UUIDV4,
		unique: true,
	},
	direction: {
		type: Sequelize.STRING,
	},
	duration: {
		type: Sequelize.INTEGER,
	},
	vehicles: {
		type: Sequelize.STRING,
	},
	cost: {
		type: Sequelize.FLOAT,
	},
	underscored: true,
});
