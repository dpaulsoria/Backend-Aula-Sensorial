"use strict";

const bcrypt = require("bcrypt"); // Asegúrate de que bcryptjs esté instalado

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla USER
    await queryInterface.createTable("USER", {
      USER_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      USER: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PASSWORD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      NAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LASTNAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Insertar el usuario por defecto
    const defaultPassword = process.env.DEFAULT_USER_PASS || "admin"; // Usa una contraseña más segura en un entorno real
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await queryInterface.bulkInsert("USER", [
      {
        USER: process.env.DEFAULT_USER || "admin",
        PASSWORD: hashedPassword,
        NAME: "Administrador",
        LASTNAME: "Administrador",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("USER");
  },
};
