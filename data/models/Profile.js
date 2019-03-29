const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nickName: {
    type: String
  },
  bio: {
    type: String
  },
  // theme: {
  //   type: String,
  //   default: "paper-cup"
  // },
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
