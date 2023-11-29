const { Sequelize } = require("sequelize");
const config = require("../config/config");
const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(
  "mysql",
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection stablished");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Can't stablish connection\n", err);
    process.exit(1);
  });
