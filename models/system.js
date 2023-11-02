const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const System = sequelize.define("System", {
    object_id: {},
    status: {}
})

module.exports = System;