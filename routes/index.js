var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger'); // Ruta correcta a tu archivo de configuración

const userRouter = require("./user");
const authRouter = require("./auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 - Middleware
router.use((req, res, next) => {
  res.status(404).send({
    msg: "404 - Not Found"
  });
});

// Error - Middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    msg: "500 - Internal Server Error",
  });
});

module.exports = router;
