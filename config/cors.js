require("dotenv").config();
const env = process.env.NODE_ENV || "development";

module.exports = {
  origin: process.env.HOST || "127.0.0.1",
  optionsSuccessStatus: 200,
};
