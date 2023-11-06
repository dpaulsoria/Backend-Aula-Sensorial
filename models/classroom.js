const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class CLASSROOM extends Model {}

CLASSROOM.init(
  {
    CLASSROOM_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DESCRIPTION: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CLASSROOM",
    tableName: "CLASSROOM",
    timestamps: true
  }
);

module.exports = CLASSROOM;
