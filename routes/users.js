var express = require('express');
var router = express.Router();

const db = require('../models').USER;

/* GET users listing. */
router.get('/', function (req, res, next) {
  let users = db.findAll();
  res.json({
    users
  })
});

module.exports = router;
