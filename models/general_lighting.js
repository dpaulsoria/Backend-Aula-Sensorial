const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class GENERAL_LIGHTING extends Model {}

GENERAL_LIGHTING.init(
  {
    OBJECT_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    STATUS: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "GENERAL_LIGHTING",
    tableName: "GENERAL_LIGHTING",
    timestamps: true,
  }
);

module.exports = GENERAL_LIGHTING;
