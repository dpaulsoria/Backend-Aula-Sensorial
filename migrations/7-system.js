"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SYSTEM", {
      OBJECT_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        references: {
          model: "ACCESS",
          key: "OBJECT_ID",
        },
      },
      STATUS: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Nota: No hay columnas createdAt y updatedAt
      // ya que timestamps está configurado como false en el modelo
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SYSTEM");
  },
};
