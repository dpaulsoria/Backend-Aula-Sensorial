const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class USER_CLASSROOM_ACCESS extends Model {}

USER_CLASSROOM_ACCESS.init(
  {
    USER_CLASSROOM_ACCESS_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    USER_CLASSROOM_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ACCESS_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "USER_CLASSROOM_ACCESS",
    tableName: "USER_CLASSROOM_ACCESS",
    timestamps: true,
  }
);

module.exports = USER_CLASSROOM_ACCESS;
