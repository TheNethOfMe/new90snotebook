const express = require("express");
const router = express.Router();

// ROUTE  GET api/profile/post
// DESC   Gets Test Profile Route
// ACCESS Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile Works"
  });
});

module.exports = router;
