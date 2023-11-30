"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SOUND_COLORS", {
      OBJECT_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        references: {
          model: "ACCESS",
          key: "OBJECT_ID"
        }
      },
      COLOR: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      SOUND: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      STATUS: {
        type: Sequelize.STRING,
        allowNull: true,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SOUND_COLORS");
  },
};
