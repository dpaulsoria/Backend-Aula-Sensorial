const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  name: {type: String, required: true},
  lastname: {type: String, required: true},
})

module.exports = mongoose.model('User', UserSchema);