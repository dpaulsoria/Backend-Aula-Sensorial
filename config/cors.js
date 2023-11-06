require("dotenv").config();

module.exports = {
    origin: process.env.DEV_HOST || "localhost",
    optionsSuccessStatus: 200
}