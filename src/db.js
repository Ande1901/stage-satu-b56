const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  host: "localhost",
  dialect: "postgres",
  database: "postgres",
  password: "Admin",
  port: 5432,
  schema: "public",
});

module.exports = db;
