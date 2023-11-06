const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class POOLS_COLORS extends Model { }

POOLS_COLORS.init(
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
    COLOR: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "POOLS_COLORS",
    tableName: "POOLS_COLORS",
    timestamps: true,
  }
);

module.exports = POOLS_COLORS;
