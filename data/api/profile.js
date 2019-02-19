const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load models
const Profile = require("../models/Profile");
const User = require("../models/User");
const Notification = require("../models/Notifications");

// Load validation
const validateProfileInput = require("../../validation/profile");

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
          res.status(404).json(errors);
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
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.email = req.user.email;
    if (req.body.firstName) profileFields.firstName = req.body.firstName;
    if (req.body.lastName) profileFields.lastName = req.body.lastName;
    if (req.body.nickName) profileFields.nickName = req.body.nickName;
    if (req.body.theme) profileFields.theme = req.body.theme;
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
        const newNote = {
          notificationFor: req.user.id,
          message: "Welcome, glad to have you here!"
        };
        new Profile(profileFields)
          .save()
          .then(profile => {
            new Notification(newNote)
              .save()
              .then(note => {
                User.findByIdAndUpdate(req.user.id, {
                  $set: { hasProfile: true }
                })
                  .then(update => res.status(201).json(note))
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    });
  }
);

// ROUTE  GET api/profile/search?
// DESC   Gets profiles by first, last, and nickname search
// ACCESS Private
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const searchFirstName = req.query.firstName ? req.query.firstName : "";
    const searchNickName = req.query.nickName ? req.query.nickName : "";
    const searchLastName = req.query.lastName ? req.query.lastName : "";
    if (!searchFirstName && !searchNickName && !searchLastName) {
      errors.empty = "You need to enter at least one name to search.";
      res.status(404).json(errors);
    }
    Profile.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { firstName: searchFirstName },
                { nickName: searchNickName }
              ]
            },
            {
              $and: [{ nickName: searchNickName }, { lastName: searchLastName }]
            },
            {
              $and: [
                { firstName: searchFirstName },
                { lastName: searchLastName }
              ]
            }
          ]
        }
      },
      {
        $addFields: {
          exact: {
            $allElementsTrue: [
              [
                { $eq: ["$firstName", searchFirstName] },
                { $eq: ["$nickName", searchNickName] },
                { $eq: ["$lastName", searchLastName] }
              ]
            ]
          }
        }
      },
      {
        $sort: {
          exact: -1
        }
      },
      {
        $project: {
          exact: 0
        }
      }
    ]).then(data => res.status(200).json(data));
  }
);

// ROUTE  GET api/profile/email/:email
// DESC   Gets a User Profile by email address
// ACCESS Private
router.get(
  "/email/:email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ email: req.params.email })
      // .populate("user", ["email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user.";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
