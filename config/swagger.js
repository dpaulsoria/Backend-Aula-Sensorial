require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
//TODO swagger realiza las consultas en la ruta api-docs de forma incorrecta

const env = process.env.NODE_ENV || "development";

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
        url:
          `http://${process.env.HOST}:${process.env.PORT}` ||
          `http://127.0.0.1:3000`,
        description: "Servidor de desarrollo local",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["user", "password", "name", "lastname"],
          properties: {
            _id: {
              type: "string",
              format: "uuid",
              description: "El ID único del usuario",
            },
            user: {
              type: "string",
              description: "Usuario",
              unique: true
            },
            name: {
              type: "string",
              description: "Nombre del usuario",
            },
            lastname: {
              type: "string",
              description: "Apellido del usuario",
            },
          },
        },
        Device: {
          type: "object",
          required: ["type", "isActive", "identifier"],
          properties: {
            type: {
              type: "string",
              enum: ["screen", "light", "speaker"],
              description: "Tipo de dispositivo",
            },
            isActive: {
              type: "boolean",
              description: "Estado de encendido/apagado del dispositivo",
            },
            identifier: {
              type: "string",
              description: "Identificador ÚNICO del dispositivo",
              unique: true,
            },
            details: {
              type: "object",
              description:
                "Propiedades específicas para cada tipo de dispositivo",
              properties: {
                song: {
                  type: "string",
                  description: "Canción que está sonando en el parlante",
                },
                volumeLevel: {
                  type: "number",
                  description: "Nivel de volumen del parlante",
                },
                color: {
                  type: "string",
                  description: "Color de la luz",
                },
                intensity: {
                  type: "number",
                  description: "Intensidad de la luz",
                },
                video: {
                  type: "string",
                  description: "Video que se reproduce en la pantalla",
                },
              },
            },
          },
          description: "Esquema para un dispositivo",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
