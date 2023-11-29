"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("USER_CLASSROOM_ACCESS", {
      USER_CLASSROOM_ACCESS_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      USER_CLASSROOM_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "USER_CLASSROOM",
          key: "USER_CLASSROOM_ID",
        },
      },
      ACCESS_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ACCESS",
          key: "ACCESS_ID",
        },
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
    await queryInterface.dropTable("USER_CLASSROOM_ACCESS");
  },
};
