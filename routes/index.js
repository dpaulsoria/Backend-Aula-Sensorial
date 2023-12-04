var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger'); // Ruta correcta a tu archivo de configuración

const userRouter = require("./user");
const authRouter = require("./auth");
const fileRouter = require("./fileRoutes");
const poolsColorsRouter = require("./poolsColors");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/file", fileRouter);

router.use("/poolsColors", poolsColorsRouter);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 - Middleware
router.use((req, res, next) => {
  res.status(404).send({
    msg: "404 - Not Found"
  });
});

module.exports = router;
