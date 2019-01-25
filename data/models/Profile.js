const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  nickName: {
    type: String
  },
  theme: {
    type: String,
    default: "paper-cup"
  },
  blacklist: {
    type: [String]
  },
  searchableProfile: {
    type: Boolean,
    default: false
  },
  menuToggle: {
    type: Boolean,
    default: true
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
