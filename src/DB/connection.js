import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { PASSWORD } = process.env;

const sequelize = new Sequelize("mjrjfmbg", "mjrjfmbg", PASSWORD, {
	host: "kandula.db.elephantsql.com",
	dialect: "postgresql",
	port: 5432,
	operatorAliases: false,
	define: {
		timestamps: false,
	},
});

export default sequelize;
global.sequelize = sequelize;
