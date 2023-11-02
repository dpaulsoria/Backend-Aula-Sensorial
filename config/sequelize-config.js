const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "aula_sensorial",
  process.env.user,
  process.env.psswd,
  {
    host: process.env.host,
    dialect: "mysql",
  }
);

module.exports = sequelize;
