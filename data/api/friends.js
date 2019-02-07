const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load model
const Friends = require("../models/Friends");
const Profile = require("../models/Profile");

// Load utility function
const friendOrganizer = require("../utils/friendOrganizer");

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
        return friendOrganizer(friendData, req.user.id);
      })
      .catch(err => console.log(err));
  }
);
