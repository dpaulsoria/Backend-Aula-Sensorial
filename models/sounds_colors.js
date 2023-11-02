const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const SoundsColors = sequelize.define("SoundsColors", {
    object_id: {},
    color: {},
    sound: {},
    status: {}
})

module.exports = SoundsColors;