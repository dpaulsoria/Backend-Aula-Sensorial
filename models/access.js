const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class ACCESS extends Model {}

ACCESS.init(
  {
    ACCESS_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ACCESS_DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OBJECT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ACCESS",
    tableName: "ACCESS",
    timestamps: true,
  }
);

module.exports = ACCESS;
