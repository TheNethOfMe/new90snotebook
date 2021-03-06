const express = require("express");
const router = express.Router();
const passport = require("passport");
const ObjectId = require("mongodb").ObjectID;

// Load models
const Posts = require("../models/Posts");
const Friends = require("../models/Friends");

// ROUTE  GET api/posts/
// DESC   Gets a user's posts
// ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.find({ createdBy: req.user.id })
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => res.status(500).json(err));
  }
);

// ROUTE  POST api/posts/
// DESC   Creates a new post
// ACCESS Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newPost = {
      createdBy: req.user.id,
      content: req.body.content,
      color: req.body.color
    };
    new Posts(newPost)
      .save()
      .then(post => res.status(200).json(post))
      .catch(err => console.log(err));
  }
);

// ROUTE  PUT api/posts/:id
// DESC   Updates a post
// ACCESS Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let updates = {};
    if (req.body.updates.color) {
      updates.color = req.body.updates.color;
    }
    if (req.body.updates.content) {
      updates.content = req.body.updates.content;
    }
    const queryID = new ObjectId(req.params.id);
    Posts.findOneAndUpdate({ _id: queryID }, { $set: updates }, { new: true })
      .then(update => {
        res.status(200).json(update);
      })
      .catch(err => console.log(err));
  }
);

// ROUTE  Get api/posts/friends
// DESC   Gets all posts by friends
// ACCESS Private
router.get(
  "/friends",
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
        $lookup: {
          from: "posts",
          localField: "friendProfile.user",
          foreignField: "createdBy",
          as: "userPosts"
        }
      },
      {
        $project: {
          postUserId: "$friendProfile.user",
          postUserFirst: "$friendProfile.firstName",
          postUserLast: "$friendProfile.lastName",
          postUserNick: "$friendProfile.nickName",
          userPosts: "$userPosts"
        }
      }
    ])
      .then(posts => res.status(200).json(posts))
      .catch(err => console.log(err));
  }
);

// ROUTE  Delete api/posts/:id
// DESC   Deletes one post
// ACCESS Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    Posts.findOneAndDelete({ _id: req.params.id })
      .then(() => res.status(200).json({ msg: "Delete Success" }))
      .catch(err => console.log(err));
  }
);

module.exports = router;
