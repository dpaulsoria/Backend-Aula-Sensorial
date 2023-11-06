const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class SOUND_COLORS extends Model {}

SOUND_COLORS.init(
  {
    OBJECT_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    COLOR: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SOUND: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    STATUS: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SOUND_COLORS",
    tableName: "SOUND_COLORS",
    timestamps: true,
  }
);

module.exports = SOUND_COLORS;
