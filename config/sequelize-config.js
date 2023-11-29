const { Sequelize } = require("sequelize");
const { config } = require("./config");

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
  }
);

module.exports = sequelize;
