const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class SYSTEM extends Model {}

SYSTEM.init(
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
    modelName: "SYSTEM",
    tableName: "SYSTEM",
    timestamps: false,
  }
);

module.exports = SYSTEM;
