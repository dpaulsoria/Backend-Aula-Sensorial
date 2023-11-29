'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("USER");
  }
};
