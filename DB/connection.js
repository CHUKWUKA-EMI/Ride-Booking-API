import Sequelize from "sequelize";

const sequelize = new Sequelize("travellers", "root", "start12345", {
	host: "127.0.0.1",
	dialect: "mysql",
	operatorAliases: false,
	define: {
		timestamps: false,
	},
});

export default sequelize;
global.sequelize = sequelize;
