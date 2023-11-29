"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("USER_CLASSROOM", {
      USER_CLASSROOM_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      USER_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "USER",
          key: "USER_ID",
        },
      },
      CLASSROOM_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CLASSROOM",
          key: "CLASSROOM_ID",
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
    await queryInterface.dropTable("USER_CLASSROOM");
  },
};
