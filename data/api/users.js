const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// ROUTE  POST api/users/register
// DESC   Creates a new user
// ACCESS Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    errors.email = "Email already registered.";
    if (user) {
      return res.status(400).json({ errors });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// ROUTE  POST api/users/login
// DESC   Login user (return jwt)
// ACCESS Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    // check if user exists
    if (!user) {
      errors.email = "User not found.";
      return res.status(404).json(errors);
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        const payload = {
          id: user.id,
          email: user.email,
          hasProfile: user.hasProfile,
          theme: user.theme
        };
        // sign token user key from uncommited file
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// ROUTE  GET api/users/current
// DESC   Return current user
// ACCESS Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// ROUTE  PUT api/users/update
// DESC   Update's user's theme
// ACCESS Private
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateTheme = { theme: req.body.theme };
    User.findOneAndUpdate({ _id: req.user.id }, { $set: updateTheme })
      .then(update => {
        res.status(200).json(updateTheme);
      })
      .catch(err => res.status(500).json({ error: err }));
  }
);

module.exports = router;
