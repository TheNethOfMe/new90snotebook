const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  friends: {
    type: [Scema.Types.ObjectId],
    ref: "users"
  },
  friendRequests: {
    type: [Scema.Types.ObjectId],
    ref: "users"
  },
  requestsSent: {
    type: [Scema.Types.ObjectId],
    ref: "users"
  },
  blacklist: {
    type: [Scema.Types.ObjectId],
    ref: "users"
  }
});

module.exports = FriendListSchema = mongoose.model(
  "friendlists",
  FriendListSchema
);
