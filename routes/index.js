var express = require('express');
var router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/user", userRouter);

router.use("/auth", authRouter);

module.exports = router;
