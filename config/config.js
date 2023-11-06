require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "aula_sensorial",
    host: process.env.DEV_HOST || "localhost",
    dialect: "mysql",
    operatorAliases: false,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "aula_sensorial",
    host: process.env.TEST_HOST || "localhost",
    dialect: "mysql",
    operatorAliases: false,
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "aula_sensorial",
    host: process.env.PROD_HOST || "localhost",
    dialect: "mysql",
    operatorAliases: false,
  },
};