const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "nombre_de_la_base_de_datos",
  "usuario",
  "contraseña",
  {
    host: "localhost",
    dialect: "mysql", // Tipo de base de datos (en este caso, MySQL)
  }
);

const User = require("./user"); // Importa tus modelos

const db = {
  sequelize,
  User, // Puedes exportar los modelos aquí si es necesario
};

// Sincroniza los modelos con la base de datos al inicio
sequelize
  .sync()
  .then(() => {
    console.log("Tablas creadas en la base de datos.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

module.exports = db;
