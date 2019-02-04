const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load model
const Friends = require("../models/Friends");

// ROUTE  POST api/friends
// DESC   Builds a user's friend list
// ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const friendList = {
      mutual: [],
      requested: [],
      received: []
    };
    Friends.find({
      $or: [
        { requested: req.user.id },
        {
          $and: [{ received: req.user.id }, { deleted: false }]
        }
      ]
    })
      .then(friendData => {
        friendData.forEach(friend => {
          if (friend.mutual) {
            friendList.mutual.push(friend);
          } else if (friend.requested === req.user.id) {
            friendList.requested.push(friend);
          } else {
            friendList.received.push(friend);
          }
        });
        res.status(200).json(friendList);
      })
      .catch(err => console.log(err));
  }
);
