require("dotenv").config();
const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "production";

let sequelize;

if (process.env.CONECTION_STRING !== "") {
  sequelize = new Sequelize(process.env.CONECTION_STRING, {
    dialect: "postgres",
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "nombre_base_datos",
    process.env.DB_USER || "usuario",
    process.env.DB_PASS || "contraseña",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "postgres",
    }
  );
}

module.exports = sequelize;
