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
 *     summary: Inicio de sesión de usuario
 *     description: Inicia sesión de un usuario y devuelve un token de acceso.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: Nombre de usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve un token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 token:
 *                   type: string
 *                   description: Token de acceso generado.
 *       401:
 *         description: Credenciales inválidas. El inicio de sesión ha fallado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor al intentar iniciar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 error:
 *                   type: string
 *                   description: Descripción del error interno.
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

    // Actualiza el campo 'token' en el usuario
    await User.findOneAndUpdate({ user }, { token });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

/**
 * @swagger
 * /refreshToken:
 *   post:
 *     summary: Renovación de Token de Acceso
 *     description: Renueva el token de acceso y proporciona un nuevo token de acceso y un token de actualización.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de actualización válido.
 *     responses:
 *       200:
 *         description: Token de acceso y token de actualización renovados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Nuevo token de acceso.
 *                 refreshToken:
 *                   type: string
 *                   description: Nuevo token de actualización.
 *       400:
 *         description: Token de actualización inválido o no encontrado.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Refresh Token Invalid
 */

router.post("/refreshToken", async (req, res) => {
  const { token } = req.body;

  const user = await User.findOne({ token }).select("-password");

  // Verifica si el token de actualización es válido
  if (!user || token !== user.token) {
    return res.status(400).send("Refresh Token Invalid");
  }

  // Genera un nuevo token de acceso y un nuevo token de actualización
  const newAccessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const newRefreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET
  );

  // Actualiza el token de actualización en la base de datos
  await User.updateOne({ _id: user._id }, { token: newRefreshToken });

  // Envía los nuevos tokens al cliente
  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
});

/**
 * @swagger
 * /user/logout:
 *   delete:
 *     summary: Cerrar sesión del usuario e invalidar el token de actualización
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de actualización del usuario a invalidar
 *     responses:
 *       '204':
 *         description: Sesión cerrada con éxito
 *       '500':
 *         description: Error interno del servidor
 */

router.delete("/logout", async (req, res) => {
  await User.updateOne({ token: req.body.token }, { token: "" });
  res.status(204).send();
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
