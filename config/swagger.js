const swaggerJsdoc = require("swagger-jsdoc");
//TODO swagger realiza las consultas en la ruta api-docs de forma incorrecta
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aula Sensorial Main API",
      version: "1.0.0",
      description: "...",
    },
    servers: [
      {
        url: `${process.env.DEV_HOST || "localhost"}`,
      },
    ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = specs;