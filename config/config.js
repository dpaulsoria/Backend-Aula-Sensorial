require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USER || "root",
    password: process.env.DEV_DB_PASSWORD || "root",
    database: process.env.DEV_DB_NAME || "aula_sensorial",
    //host: process.env.DEV_DB_HOST || "127.0.0.1",
    dialect: process.env.DEV_DB_DIALECT || "mysql",
    operatorAliases: false,
  },
  test: {
    username: process.env.TEST_DB_USER || "root",
    password: process.env.TEST_DB_PASSWORD || "root",
    database: process.env.TEST_DB_NAME || "aula_sensorial",
    //host: process.env.TEST_DB_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false,
  },
  production: {
    username: process.env.PROD_DB_USER || "root",
    password: process.env.PROD_DB_PASSWORD || "root",
    database: process.env.PROD_DB_NAME || "aula_sensorial",
    //host: process.env.PROD_DB_HOST || "127.0.0.1",
    dialect: process.env.PROD_DB_DIALECT || "mysql",
    operatorAliases: false,
  },
};
