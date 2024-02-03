var express = require("express");
var router = express.Router();
// const swaggerUI = require("swagger-ui-express");
// const swaggerSpec = require("../config/swagger");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// // Swagger
// router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


router.use((req, res, next) => {
  res.status(404).send({
    msg: "404 - Not Found"
  });
});

module.exports = router;