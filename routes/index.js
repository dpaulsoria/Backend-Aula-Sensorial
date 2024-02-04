var express = require("express");
var router = express.Router();
const userRouter = require("./user");
const deviceRouter = require("./device");
const fileRouter = require("./file");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

// Swagger
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/file", fileRouter);

router.use((req, res, next) => {
  res.status(404).send({
    msg: "404 - Not Found",
  });
});

module.exports = router;
