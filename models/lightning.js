const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const Lightning = sequelize.define("Lightning", {
    object_id: {},
    status: {}
})

module.exports = Lightning;