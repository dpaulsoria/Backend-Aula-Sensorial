const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");
const User = require("./user");

const ClassroomUser = sequelize.define("ClassroomUser", {
  classroomuser_id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.NUMBER,
  },
  classroom_id: {
    type: DataTypes.NUMBER,
  },
});

ClassroomUser.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
})

module.exports = ClassroomUser;