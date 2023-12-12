require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("./config");

const env = process.env.NODE_ENV || "production";

let sequelize;

if(process.env.CONECTION_STRING != ''){
  sequelize = new Sequelize(process.env.CONECTION_STRING, {
    // Configuración adicional según sea necesario (ejemplo: ssl)
    dialect: "postgres", // Tipo de base de datos (PostgreSQL en este caso)
    ssl: {
      rejectUnauthorized: false, // Podría ser necesario dependiendo de la configuración de Render
    },
  });
}else{
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {
      host: config[env].host,
      dialect: config[env].dialect,
    }
  );
}

module.exports = sequelize;
