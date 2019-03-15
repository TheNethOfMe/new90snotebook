const express = require("express");
const router = express.Router();
const passport = require("passport");
const ObjectId = require("mongodb").ObjectID;

// Load model
const Friends = require("../models/Friends");

// ROUTE  GET api/friends
// DESC   Builds a user's friend list
// ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const queryID = new ObjectId(req.user.id);
    Friends.aggregate([
      {
        $match: {
          $or: [
            { setTo: queryID },
            {
              $and: [{ sentFrom: queryID }, { deleted: false }]
            }
          ]
        }
      },
      {
        $addFields: {
          getProfile: {
            $cond: {
              if: { $eq: ["$sentFrom", queryID] },
              then: "$sentTo",
              else: "$sentFrom"
            }
          }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "getProfile",
          foreignField: "user",
          as: "friendProfile"
        }
      },
      {
        $unwind: "$friendProfile"
      },
      {
        $project: {
          friendUserId: "$friendProfile.user",
          friendFirstName: "$friendProfile.firstName",
          friendLastname: "$friendProfile.lastName",
          friendNickName: "$friendProfile.nickName",
          friendTheme: "$friendProfile.theme",
          friendEmail: "$friendProfile.email",
          status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$accepted", true] },
                  then: "mutual"
                },
                {
                  case: { $eq: ["$sentTo", "$friendProfile.user"] },
                  then: "pending"
                }
              ],
              default: "received"
            }
          }
        }
      }
    ]).then(data => res.status(200).json(data));
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
      sentFrom: req.user.id,
      sentTo: req.body.recipientId,
      accepted: false,
      deleted: false
    };
    new Friend(friendObject)
      .save()
      .then(data => res.status(200).json(data))
      .catch(err => console.log(err));
  }
);

module.exports = router;
