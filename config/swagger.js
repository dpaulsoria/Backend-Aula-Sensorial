const swaggerJsdoc = require("swagger-jsdoc");

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
        url: `${process.env.DEV_HOST || "localhost"}:${process.env.PORT || "3000"}`,
      },
    ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = specs;