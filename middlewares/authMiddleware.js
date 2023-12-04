const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    res.sendStatus(400).send({
      msg: "Token not present",
    });
  }

  const token = authHeader.split(" ")[1];
  if (token == null)
    res.sendStatus(400).send({
      msg: "Token not present",
    });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send({
        msg: "Token invalid",
      });
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = validateToken;
