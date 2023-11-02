const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

const Access = sequelize.define("Access", {
    access_id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING(10),
        allowNull:true
    },
    object_id: {
        type: DataTypes.NUMBER,
        allowNull: true
    }
});

module.exports = Access;

/**
 * Esta tabla almacena la información de los accesos, es decir aquí se encuentra a que modulo
pertenece el acceso, esto lo hace mediante el id_objeto de los módulos que tienen que ser
únicos (tipo una dirección MAC).
 */