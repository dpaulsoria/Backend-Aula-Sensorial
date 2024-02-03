const User = require("../models/user");
const Device = require("../models/device");

const userValidator = (req, res, next) => {
  const validation = new User(req.body).validateSync();
  if (validation) {
    return res.status(400).json({ error: validation.message });
  }
  next();
}

const deviceValidator = (req, res, next) => {
  const validation = new Device(req.body).validateSync();
  if (validation) {
    return res.status(400).json({ error: validation.message });
  }
  next();
};


module.exports = { userValidator, deviceValidator };