const express = require("express");
const router = express.Router();
const passport = require("passport");
const ObjectId = require("mongodb").ObjectID;

// Load model
const Friends = require("../models/Friends");
const Profile = require("../models/Profile");

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
            { sentFrom: queryID },
            {
              $and: [{ sentTo: queryID }, { deleted: false }]
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
          friendLastName: "$friendProfile.lastName",
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
    ]).then(data => {
      res.status(200).json(data);
    });
  }
);

// ROUTE  POST api/friends/
// DESC   Creates new FriendRequest object and returns the recipiant's data as a pending friend
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
    const friendID = new ObjectId(req.body.recipientId);
    console.log(friendID);
    new Friend(friendObject)
      .save()
      .then(() => {
        Profile.aggregate([
          {
            $match: { user: friendID }
          },
          {
            $project: {
              friendUserId: "$user",
              friendFirstName: "$firstName",
              friendLastName: "$lastName",
              friendNickName: "$nickName",
              friendTheme: "$theme",
              friendEmail: "$email",
              status: "pending"
            }
          }
        ]).then(data => {
          res.status(200).json(data);
        });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
