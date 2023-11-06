const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class GENERAL_LIGHTINIG extends Model {}

GENERAL_LIGHTINIG.init(
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
    modelName: "GENERAL_LIGHTINIG",
    tableName: "GENERAL_LIGHTINIG",
    timestamps: true,
  }
);

module.exports = GENERAL_LIGHTINIG;
