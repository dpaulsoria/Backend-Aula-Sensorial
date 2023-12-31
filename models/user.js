const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class USER extends Model {}

USER.init(
  {
    USER_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    USER: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LASTNAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "USER",
    tableName: "USER",
    timestamps: true, 
  }
);

module.exports = USER;
