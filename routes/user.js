/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints para la funcionalidad de gestion de usuarios
 */

var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { userValidator } = require("../middlewares/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión proporcionando su nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - password
 *             properties:
 *               user:
 *                 type: string
 *                 description: Nombre de usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Sesión iniciada con éxito. Devuelve un token de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: Token de acceso que debe incluirse en las solicitudes posteriores.
 *       401:
 *         description: Credenciales de inicio de sesión no válidas.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/login", async function (req, res, next) {
  const { user, password } = req.body;
  try {
    // Busca al usuario por su nombre de usuario
    const existingUser = await User.findOne({ user });
    // Si no se encuentra el usuario o la contraseña no coincide, devuelve un error 401
    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Si las credenciales son válidas, genera un token de acceso
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Puedes ajustar la duración del token
      }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     summary: Crea un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - password
 *               - name
 *               - lastname
 *             properties:
 *               user:
 *                 type: string
 *                 description: Nombre de usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               lastname:
 *                 type: string
 *                 description: Apellido del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 id:
 *                   type: string
 *                   description: ID del usuario creado.
 *                 user:
 *                   type: string
 *                   description: Nombre de usuario.
 *                 name:
 *                   type: string
 *                   description: Nombre de usuario.
 *                 lastname:
 *                   type: string
 *                   description: Apellido del usuario.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/", userValidator, async function (req, res, next) {
  const { user, name, lastname } = req.body;
  let { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating the user", error: error.message });
  }

  try {
    const newUser = new User({
      user,
      password,
      name,
      lastname,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created",
      id: newUser._id,
      user: newUser.user,
      name: newUser.name,
      lastname: newUser.lastname,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating the user", error: error.message });
  }
});

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Obtiene una lista de usuarios
 *     description: Retorna una lista paginada de usuarios.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de usuarios por página
 *     responses:
 *       200:
 *         description: Lista de usuarios paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", async function (req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({})
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res.status(200).json({ message: "Success", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

/**
 * @swagger
 * /user/by-id/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Obtiene un usuario por ID
 *     description: Retorna un único usuario según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/by-id/:id", async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res
      .status(500)
      .json({ message: "Error retrieving the user", error: error.message });
  }
});

/**
 * @swagger
 * /user/search:
 *   get:
 *     tags:
 *       - User
 *     summary: Busca usuarios por nombre de usuario
 *     description: Retorna una lista de usuarios que coinciden con el nombre de usuario proporcionado.
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de usuario a buscar
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No se encontraron usuarios
 *       500:
 *         description: Error interno del servidor
 */

router.get("/search", async function (req, res, next) {
  try {
    const { username } = req.query;
    const users = await User.find({ user: username }).select("-password");
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

/**
 * @swagger
 * /user/by-id/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Elimina un usuario
 *     description: Elimina un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/by-id/:id", async function (req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res
      .status(500)
      .json({ message: "Error deleting the user", error: error.message });
  }
});

/**
 * @swagger
 * /user/by-username/{username}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Elimina un usuario por nombre de usuario
 *     description: Elimina un usuario específico por su nombre de usuario.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de usuario del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/by-username/:username", async function (req, res, next) {
  try {
    const username = req.params.username;
    const user = await User.findOneAndDelete({ user: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res
      .status(500)
      .json({ message: "Error deleting the user", error: error.message });
  }
});

/**
 * @swagger
 * paths:
 *   /user/by-id/{id}/change-password:
 *     patch:
 *       tags:
 *         - User
 *       summary: Cambia la contraseña de un usuario
 *       description: Actualiza la contraseña de un usuario específico por su ID.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID del usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - newPassword
 *               properties:
 *                 newPassword:
 *                   type: string
 *                   format: password
 *                   description: La nueva contraseña del usuario
 *       responses:
 *         200:
 *           description: Contraseña actualizada exitosamente
 *         400:
 *           description: ID inválido o problema con los datos proporcionados
 *         404:
 *           description: Usuario no encontrado
 *         500:
 *           description: Error interno del servidor
 *
 *
 *
 *         
 * @route PATCH /user/by-id/{id}/change-password
 * @group User - Operaciones sobre usuarios
 * @param {string} id.path.required - ID del usuario
 * @param {object} body.body.required - Información de la contraseña
 * @returns {object} 200 - Contraseña actualizada con éxito
 * @returns {Error}  400 - ID inválido
 * @returns {Error}  404 - Usuario no encontrado
 * @returns {Error}  500 - Error del servidor
 */

router.patch("/by-id/:id/change-password", async function (req, res) {
  try {
    const userId = req.params.id;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res.status(500).json({
      message: "Error updating the password",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /user/by-username/{username}/change-password:
 *   patch:
 *     tags:
 *       - User
 *     summary: Cambia la contraseña de un usuario por nombre de usuario
 *     description: Actualiza la contraseña de un usuario específico por su nombre de usuario.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de usuario del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: La nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.patch(
  "/by-username/:username/change-password",
  async function (req, res) {
    try {
      const username = req.params.username;
      const { newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await User.findOneAndUpdate(
        { user: username },
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating the password",
        error: error.message,
      });
    }
  }
);

module.exports = router;
