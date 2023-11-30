require("dotenv").config();
const config = require("../config/config");
const env = process.env.NODE_ENV || "development";

module.exports = {
  origin: config[env].host || "127.0.0.1",
  optionsSuccessStatus: 200,
};
