const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class MONITOR extends Model {}

MONITOR.init(
  {
    MONITOR_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    USER_CLASSROOM_ACCESS_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LOGIN_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    LOGOUT_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MONITOR",
    tableName: "MONITOR",
    timestamps: true,
  }
);

module.exports = MONITOR;
