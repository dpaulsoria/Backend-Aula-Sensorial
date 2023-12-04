const poolsColors = require("../models/pools_colors");
const validStatusList = ["on", "off", "disabled"];
class PoolsColorsRepository {
  static async getLastValid() {
    const actual = await poolsColors.findOne({
      order: [["createdAt", "DESC"]], // Ordena por fechaCreacion de forma descendente (DESC)
    });

    if (actual) {
      return actual;
    } else {
      return await poolsColors.create({
        STATUS: "off",
        COLOR: "#ffffff",
      });
    }
  }

  static async update(data) {
    if (data && data.STATUS) {
      if (!validStatusList.includes(data.STATUS)) {
        throw new Error("Invalid status");
      }
    }
    let lastColor = await this.getLastValid(); // Obtener el último color válido
    if (lastColor) {
      await poolsColors.update(data, {
        where: { OBJECT_ID: lastColor.OBJECT_ID },
      });
      let res = await this.getLastValid(); // Obtener el último color válido actualizado
      return res;
    } else {
      throw new Error("No se encontró un color válido para actualizar");
    }
  }
}
module.exports = PoolsColorsRepository;
