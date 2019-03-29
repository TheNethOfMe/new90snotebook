const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Do we really need a 'name' field in these objects?

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  hasProfile: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: "paper-cup"
  }
});

module.exports = User = mongoose.model("users", UserSchema);
