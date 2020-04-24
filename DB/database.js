"use strict";

import Sequelize from "sequelize";
import sequelize from "./connection";

import users from "../models/Users";
import routes from "../models/Routes";
import bookings from "../models/Bookings";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = users;
db.routes = routes;
db.bookings = bookings;

// db.users.hasMany(db.bookings, { as: "bookings", foreignKey: "userId" });
// db.bookings.belongsTo(db.users, { as: "Users", foreignKey: "userId" });

//db.bookings.sync();

export default db;
