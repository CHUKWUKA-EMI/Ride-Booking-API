import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const passwd = process.env.PASSWORD;

const sequelize = new Sequelize("test_db", "user", passwd, {
	host: "127.0.0.1",
	dialect: "mysql",
	operatorAliases: false,
});

export default sequelize;
global.sequelize = sequelize;
