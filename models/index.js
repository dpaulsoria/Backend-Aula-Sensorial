const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize-config")

const USER = require("./user");
const CLASSROOM = require("./classroom")
const USER_CLASSROOM = require("./user_classroom")
const ACCESS = require("./access")
const GENERAL_LIGHTING = require("./general_lighting")
const POOLS_COLORS = require("./pools_colors")
const SYSTEM = require("./system")
const SOUND_COLORS = require("./sound_colors")
const USER_CLASSROOM_ACCESS = require("./user_classroom_access")
const MONITOR = require("./monitor")

const db = {
  sequelize,
  USER,
  CLASSROOM,
  USER_CLASSROOM,
  ACCESS,
  GENERAL_LIGHTING,
  POOLS_COLORS,
  SYSTEM,
  SOUND_COLORS,
  USER_CLASSROOM_ACCESS,
  MONITOR
};

ACCESS.belongsTo(CLASSROOM, {
  foreignKey: "CLASSROOM_ID"
});

CLASSROOM.hasMany(ACCESS, {
  foreignKey: "CLASSROOM_ID"
});

USER.belongsToMany(CLASSROOM, {
  through: 'USER_CLASSROOM',
  foreignKey: 'USER_ID',
});

CLASSROOM.belongsToMany(USER, {
  through: 'USER_CLASSROOM',
  foreignKey: 'CLASSROOM_ID',
});

USER_CLASSROOM.belongsTo(USER, {
  foreignKey: 'USER_ID'
});

USER_CLASSROOM.belongsTo(CLASSROOM, {
  foreignKey: 'CLASSROOM_ID'
});

SOUND_COLORS.hasOne(ACCESS, {
  foreignKey: "OBJECT_ID"
});

ACCESS.belongsTo(SOUND_COLORS, {
  foreignKey: "OBJECT_ID"
});

SYSTEM.hasOne(ACCESS, {
  foreignKey: "OBJECT_ID"
});

ACCESS.belongsTo(SYSTEM, {
  foreignKey: "OBJECT_ID"
});

POOLS_COLORS.hasOne(ACCESS, {
  foreignKey: "OBJECT_ID"
});

ACCESS.belongsTo(POOLS_COLORS, {
  foreignKey: "OBJECT_ID"
});

GENERAL_LIGHTING.hasOne(ACCESS, {
  foreignKey: "OBJECT_ID"
});

ACCESS.belongsTo(GENERAL_LIGHTING, {
  foreignKey: "OBJECT_ID"
});

USER_CLASSROOM_ACCESS.belongsTo(ACCESS, {
  foreignKey: "ACCESS_ID"
});

ACCESS.hasMany(USER_CLASSROOM_ACCESS, {
  foreignKey: "ACCESS_ID"
});

USER_CLASSROOM_ACCESS.belongsTo(USER_CLASSROOM, {
  foreignKey: "USER_CLASSROOM_ID"
});

USER_CLASSROOM.belongsTo(USER_CLASSROOM_ACCESS, {
  foreignKey: "USER_CLASSROOM_ID",
});

MONITOR.belongsTo(USER_CLASSROOM_ACCESS, {
  foreignKey: "USER_CLASSROOM_ACCESS_ID"
});

USER_CLASSROOM_ACCESS.hasOne(MONITOR, {
  foreignKey: "USER_CLASSROOM_ACCESS_ID"
})

// // Sincroniza los modelos con la base de datos al inicio
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Tablas creadas en la base de datos.");
//   })
//   .catch((error) => {
//     console.error("Error al sincronizar la base de datos:", error);
//   });

module.exports = db;
