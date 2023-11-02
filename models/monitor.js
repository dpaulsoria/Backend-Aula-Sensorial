const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const Monitor = sequelize.define("Monitor", {
  monitor_id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    allowNull: false,
  },
  user_classroom_access_id: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  login_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  logout_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Monitor;