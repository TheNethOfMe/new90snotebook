const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load models
const Profile = require("../models/Profile");
const User = require("../models/User");

// ROUTE  GET api/profile/test
// DESC   Gets Test Profile Route
// ACCESS Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile Works"
  });
});

// ROUTE  GET api/profile/
// DESC   Gets Current User's Profile
// ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).send(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(500).json(err));
  }
);

// ROUTE  POST api/profile/
// DESC   Creates or Updates A Profile for the Current User
// ACCESS Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.firstName) profileFields.firstName = req.body.firstName;
    if (req.body.lastName) profileFields.lastName = req.body.lastName;
    if (req.body.nickName) profileFields.nickName = req.body.nickName;
    if (req.body.theme) profileFields.theme = req.body.theme;
    if (req.body.screenName) profileFields.screenName = req.body.screenName;
    if (req.body.searchableProfile)
      profileFields.searchableProfile = req.body.searchableProfile;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Ensure screenName is unique
        Profile.findOne({ screenName: profileFields.screenName }).then(
          profile => {
            if (profile) {
              errors.screenName = "That screen name has been taken.";
              res.status(400).json(errors);
            }
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        );
      }
    });
  }
);

module.exports = router;
