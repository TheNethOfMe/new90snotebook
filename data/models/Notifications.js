const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  messages: {
    type: Number,
    default: 0
  },
  friendRequests: {
    type: [String]
  },
  newFriends: {
    type: [String]
  }
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
