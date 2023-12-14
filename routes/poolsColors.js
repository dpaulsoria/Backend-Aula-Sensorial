/**
 * @swagger
 * tags:
 *   name: PoolsColors
 *   description: API endpoints para la funcionalidad de piscina led
 */

var express = require("express");
var router = express.Router();

const db = require("../models").USER;
const poolsColorsRepository = require("../repositories/poolsColorsRepository");
/**
 * @swagger
 * /poolsColors:
 *    get:
 *      summary: Estado Actual de la piscina led
 *      tags: [PoolsColors]
 *      responses:
 *        '200':
 *          description: Successful login
 *        '401':
 *          description: Invalid credentials
 *        '404':
 *          description: User does not exist
 *        '500':
 *          description: Internal Server Error
 */
router.get("/", async function (req, res, next) {
  res.json(await poolsColorsRepository.getLastValid());
});

/**
 * @swagger
 * /poolsColors:
 *    put:
 *      summary: Actualizar el estado de las piscina led
 *      tags: [PoolsColors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                STATUS:
 *                  type: string
 *                  description: Estado actual de la piscina led. Estados permitidos ["on", "off", "disabled"]
 *                COLOR:
 *                  type: string
 *                  description: Codigo de color en Hexadecimal
 *      responses:
 *        '200':
 *          description: Successful login
 *        '401':
 *          description: Invalid credentials
 *        '404':
 *          description: User does not exist
 *        '500':
 *          description: Internal Server Error
 */
router.put("/", async function (req, res, next) {
  try {
    res.json(await poolsColorsRepository.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
