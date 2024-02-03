const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  token: { type: String, required: false },
});

module.exports = mongoose.model("User", UserSchema);
