const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserRepository {
  static async getAllUsers() {
    return User.findAll({
      attributes: { exclude: ["PASSWORD"] },
    });
  }

  static async getByUser(username){
    return User.findOne({
      where: {
        user: username,
      },
    });
  }

  static async create(data) {
    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(data.PASSWORD, 10);
    // Crea un nuevo usuario en la base de datos
    data.PASSWORD = hashedPassword;
    return await User.create(data);
  }

  static async getUserById(id) {
    return User.findByPk(id);
  }

  static async updateUser(id, data) {
    return User.update(data, {
      where: { id },
    });
  }

  static async deleteUser(id) {
    return User.destroy({
      where: { id },
    });
  }
}
 module.exports = UserRepository;