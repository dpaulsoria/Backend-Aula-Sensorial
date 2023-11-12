var express = require("express");
var router = express.Router();

const db = require("../models").USER;
const userRepository = require("../repositories/userRepository");
// importamos y usamos el middleware de autorizacion
const authMiddleware = require("../middlewares/authMiddleware");
router.use(authMiddleware);

/** Este es un ejemplo de Documentacion en Swagger
 * @swagger
 * /user:
 *  get:
 *    summary: Obtiene una lista de todos los usuarios.
 *    description: Metodo findAll sobre la tabla de usuarios.
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        description: Número de página para la paginación
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: Número de usuarios por página
 *      - in: header
 *        name: X-Request-ID
 *        schema:
 *          type: string
 *          format: uuid
 *        required: false
 *        description: Identificador único del request
 *    responses:
 *      200:
 *        description: Una lista de usuarios.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *                page:
 *                  type: integer
 *                limit:
 *                  type: integer
 *                totalPages:
 *                  type: integer
 *                totalCount:
 *                  type: integer
 *            examples:
 *              application/json:
 *                - page: 1
 *                  limit: 10
 *                  totalPages: 5
 *                  totalCount: 50
 *                  users: [{id: 1, name: "John Doe", email: "john@example.com"}, {...}]
 *      400:
 *        description: Entrada inválida
 *      500:
 *        description: Error en el servidor
 *
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *        name:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 */

router.get("/", async function (req, res, next) {
  res.json(await userRepository.getAllUsers());
});

router.get("/id/:id", function (req, res, next) {
  let user_id = req.params.id;
  let user = db.findOne({ id: user_id });
  res.json(user);
});

router.post("", function (req, res, next) {
  
});

module.exports = router;
