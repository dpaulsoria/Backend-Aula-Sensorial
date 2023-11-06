var express = require('express');
var router = express.Router();

const db = require('../models').USER;

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Obtiene una lista de los usuarios.
 *    description: Obtiene una lista de los usuarios.
 *    response:
 *      200:
 *        description: Una lista de usuarios.
 */
router.get('/', function (req, res, next) {
  let users = db.findAll();
  res.json({
    users
  })
});

module.exports = router;
