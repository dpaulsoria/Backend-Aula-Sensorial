require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
//TODO swagger realiza las consultas en la ruta api-docs de forma incorrecta
const config = require("../config/config");
const env = process.env.NODE_ENV || "development";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aula Sensorial Main API",
      version: "1.0.0",
      description: "...",
    },
    /*
    servers: [
      {
        url: `${config[env].host || "127.0.0.1"}`,
      },
    ],
     */
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
