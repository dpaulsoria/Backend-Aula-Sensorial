const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class USER_CLASSROOM extends Model {}

USER_CLASSROOM.init(
  {
    USER_CLASSROOM_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "USER",
        key: "USER_ID",
      },
    },
    CLASSROOM_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CLASSROOM",
        key: "CLASSROOM_ID",
      },
    },
  },
  {
    sequelize,
    modelName: "USER_CLASSROOM",
    tableName: "USER_CLASSROOM",
    timestamps: true,
  }
);

module.exports = USER_CLASSROOM;
