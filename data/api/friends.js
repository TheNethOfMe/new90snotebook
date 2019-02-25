const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load model
const Friends = require("../models/Friends");

// Load utility function
const friendOrganizer = require("../utils/friendOrganizer");

// ROUTE  GET api/friends
// DESC   Builds a user's friend list
// ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Friends.find({
      $or: [
        { requested: req.user.id },
        {
          $and: [{ received: req.user.id }, { deleted: false }]
        }
      ]
    })
      .then(friendData => {
        return friendOrganizer(friendData, req.user.id);
      })
      .catch(err => console.log(err));
  }
);

// ROUTE  POST api/friends/
// DESC   Creates new FriendRequest object
// ACCESS Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const friendObject = {
      requested: req.user.id,
      received: req.body.recipientId,
      accepted: false,
      deleted: false
    };
    console.log(friendObject);
    new Friend(friendObject)
      .save()
      .then(() => res.status(201))
      .catch(err => console.log(err));
  }
);

module.exports = router;
