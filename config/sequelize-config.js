require("dotenv").config();
const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "production";

// Configuración de la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite', // Especifica el dialecto como SQLite
  storage: 'database.sqlite', // Ruta donde se guardará la base de datos SQLite
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
    
    await sequelize.sync({ force: true });
    console.log(
      "Modelos sincronizados correctamente (la base de datos se creó si no existía)."
    );

  } catch (error) {
    console.error("Error al conectar y sincronizar la base de datos:", error);
  }
})();

/* const sequelize = new Sequelize(
    process.env.DB_NAME || "nombre_base_datos",
    process.env.DB_USER || "usuario",
    process.env.DB_PASS || "contraseña",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "postgres",
    }
  ); */

module.exports = sequelize;
