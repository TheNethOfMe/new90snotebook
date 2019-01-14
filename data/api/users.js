const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys_dev");

// ROUTE  GET api/users/post
// DESC   Gets Test User Route
// ACCESS Public
router.get("/test", (req, res) => {
  res.json({
    msg: "USERS Works"
  });
});

// ROUTE  POST api/users/register
// DESC   Creates a new user
// ACCESS Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already registered." });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        console.log("USER", newUser);
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
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        const payload = {
          id: user.id,
          name: user.name
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
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
