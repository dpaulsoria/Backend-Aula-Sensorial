"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MONITOR", {
      MONITOR_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      USER_CLASSROOM_ACCESS_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "USER_CLASSROOM_ACCESS",
          key: "USER_CLASSROOM_ACCESS_ID",
        },
      },
      LOGIN_TIME: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      LOGOUT_TIME: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("MONITOR");
  },
};
