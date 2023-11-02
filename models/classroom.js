const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const Classroom = sequelize.define("Classroom", {
  classroom_id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

module.exports = Classroom;
