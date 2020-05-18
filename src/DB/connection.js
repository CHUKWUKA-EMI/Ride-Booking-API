import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { PASSWORD, DB_URL2 } = process.env;

const sequelize = new Sequelize("justice", "rowland", PASSWORD, {
	host: "mysql-8867-0.cloudclusters.net",
	dialect: "mysql",
	port: 8867,
	operatorAliases: false,
	define: {
		timestamps: false,
	},
});
//const sequelize = new Sequelize(DB_URL2, { define: { timestamps: false } });

export default sequelize;
global.sequelize = sequelize;
