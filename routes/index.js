var express = require('express');
var router = express.Router();
const userRouter = require("./user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/user", userRouter);

module.exports = router;
