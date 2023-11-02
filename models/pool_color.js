const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const PoolColor = sequelize.define("PoolColor", {
    object_id: {},
    status: {},
    color: {}
})

module.exports = PoolColor;