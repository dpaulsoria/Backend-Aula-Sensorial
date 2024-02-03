/**
 * @swagger
 * tags:
 *   name: Device
 *   description: API endpoints para la funcionalidad de gestion de dispositivos (Luces, parlantes, pantallas)
 */

var express = require("express");
var router = express.Router();
const Device = require("../models/device");
const { deviceValidator } = require("../middlewares/validator");

router.get("/HOLA", async function (req, res, next) {
  res.json({ message: "HOLA" });
});

/**
 * @swagger
 * /device:
 *   post:
 *     tags:
 *       - Device
 *     summary: Crea un nuevo dispositivo
 *     description: Registra un nuevo dispositivo en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Dispositivo creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/", deviceValidator, async function (req, res, next) {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    return res.status(201).json(newDevice);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating the device", error: error.message });
  }
});

/**
 * @swagger
 * /device:
 *   get:
 *     tags:
 *       - Device
 *     summary: Lista todos los dispositivos
 *     description: Retorna una lista de todos los dispositivos registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", async function (req, res, next) {
  try {
    const devices = await Device.find({});
    return res.status(200).json(devices);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving devices", error: error.message });
  }
});

/**
 * @swagger
 * /device/{id}:
 *   get:
 *     tags:
 *       - Device
 *     summary: Obtiene un dispositivo por ID
 *     description: Retorna un único dispositivo según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id", async function (req, res, next) {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json(device);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving the device", error: error.message });
  }
});

/**
 * @swagger
 * /device/identifier/{identifier}:
 *   get:
 *     tags:
 *       - Device
 *     summary: Obtiene un dispositivo por identificador
 *     description: Retorna un único dispositivo según el identificador proporcionado.
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/identifier/:identifier", async function (req, res, next) {
  try {
    const device = await Device.findOne({ identifier: req.params.identifier });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json(device);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving the device", error: error.message });
  }
});

/**
 * @swagger
 * /device/{id}:
 *   delete:
 *     tags:
 *       - Device
 *     summary: Elimina un dispositivo
 *     description: Elimina un dispositivo específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo a eliminar
 *     responses:
 *       200:
 *         description: Dispositivo eliminado exitosamente
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:id", async function (req, res, next) {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting the device", error: error.message });
  }
});

/**
 * @swagger
 * /device/identifier/{identifier}:
 *   delete:
 *     tags:
 *       - Device
 *     summary: Elimina un dispositivo por identificador
 *     description: Elimina un dispositivo específico por su identificador.
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del dispositivo a eliminar
 *     responses:
 *       200:
 *         description: Dispositivo eliminado exitosamente
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete(
  "/identifier/:identifier",
  async function (req, res, next) {
    try {
      const device = await Device.findOneAndDelete({
        identifier: req.params.identifier,
      });
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      return res.status(200).json({ message: "Device deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting the device", error: error.message });
    }
  }
);

/**
 * @swagger
 * /device/{id}/details:
 *   patch:
 *     tags:
 *       - Device
 *     summary: IMPORTANTE Actualiza detalles de un dispositivo
 *     description: Actualiza atributos específicos de los detalles de un dispositivo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               song:
 *                 type: string
 *               volumeLevel:
 *                 type: number
 *               color:
 *                 type: string
 *               intensity:
 *                 type: number
 *               video:
 *                 type: string
 *     responses:
 *       200:
 *         description: Detalles del dispositivo actualizados con éxito
 *       400:
 *         description: ID inválido o problema con los datos proporcionados
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.patch("/:id/details", async function (req, res, next) {
  try {
    const update = { details: req.body };
    const device = await Device.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    return res
      .status(200)
      .json({ message: "Device details updated successfully", device });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating device details", error: error.message });
  }
});

/**
 * @swagger
 * /device/identifier/{identifier}/details:
 *   patch:
 *     tags:
 *       - Device
 *     summary: Actualiza detalles de un dispositivo por identificador
 *     description: Actualiza atributos específicos de los detalles de un dispositivo según su identificador.
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del dispositivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               song:
 *                 type: string
 *               volumeLevel:
 *                 type: number
 *               color:
 *                 type: string
 *               intensity:
 *                 type: number
 *               video:
 *                 type: string
 *     responses:
 *       200:
 *         description: Detalles del dispositivo actualizados con éxito
 *       400:
 *         description: ID inválido o problema con los datos proporcionados
 *       404:
 *         description: Dispositivo no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.patch(
  "/identifier/:identifier/details",
  async function (req, res, next) {
    try {
      const { identifier } = req.params;
      const update = { details: req.body };
      const device = await Device.findOneAndUpdate({ identifier }, update, {
        new: true,
      });
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      return res
        .status(200)
        .json({ message: "Device details updated successfully", device });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Error updating device details",
          error: error.message,
        });
    }
  }
);

module.exports = router;
