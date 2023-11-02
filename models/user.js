const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");
const ClassroomUser = require("./classroom_user");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  second_name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  second_surname: {
    type: DataTypes.STRING,
  },
});

User.hasMany(ClassroomUser, {
  foreignKey: "user_id",
  as: "classrooms"
})

module.exports = User;
