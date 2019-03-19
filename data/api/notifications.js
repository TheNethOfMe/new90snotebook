const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load models
const Notification = require("../models/Notifications");

// ROUTE  POST api/notification
// DESC   Creates a notification
// ACCESS Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newNotification = {};
    newNotification.notificationFor = req.body.notificationFor;
    newNotification.message = req.body.message;
    new Notification(newNotification)
      .save()
      .then(() => res.status(201))
      .catch(err => console.log(err));
  }
);

// ROUTE  GET api/notification
// DESC   Gets all notifications for logged in user
// ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Notification.find({ notificationFor: req.user.id })
      .then(notifications => res.status(200).json(notifications))
      .catch(err => console.log(err));
  }
);

// ROUTE  DELETE api/notification/:id
// DESC   Deletes a notification
// ACCESS Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Notification.findOneAndDelete({ _id: req.params.id })
      .then(() => res.status(202).json({ msg: "Notification Deleted." }))
      .catch(err => console.log(err));
  }
);

module.exports = router;
