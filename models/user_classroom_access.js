const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const UserClassroomAcces = sequelize.define("UserClassroomAccess", {
    user_classroom_access_id: {
      
  }, classroom_id: {

  }, access_id: {
    
  }
});

module.exports = UserClassroomAcces;