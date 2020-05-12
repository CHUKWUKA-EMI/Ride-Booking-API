import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { PASSWORD, DB_URL } = process.env;

// const sequelize = new Sequelize("travellers", "root", Pass, {
// 	host: "127.0.0.1",
// 	dialect: "mysql",
// 	operatorAliases: false,
// 	define: {
// 		timestamps: false,
// 	},
// });
const sequelize = new Sequelize(DB_URL);

export default sequelize;
global.sequelize = sequelize;
