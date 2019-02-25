const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendListSchema = new Schema({
  // The user that initiated the request
  // These will show up in the sender's "sent requests" unless accepted is true
  requested: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // The user that will recieve the request
  // These will show up in the recipient's "requests" unless accepted or deleted is true
  received: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // Indicates that the recipient accepted the request and the users are friends
  // If true, this will show up in sender's and recipient's "friends" list
  accepted: {
    type: Boolean,
    default: false
  },
  // Indicates that the recipient deleted the request and does not want to be friends
  // If true, this will no longer show up in recipient's "requests" but the sender will not know this
  deleted: {
    type: Boolean,
    default: false
  }
});
// A sender deleting the request deletes the request outright and the recipient will no longer see it as well

module.exports = Friend = mongoose.model("friendlists", FriendListSchema);
