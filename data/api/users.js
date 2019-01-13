const express = require("express");
const router = express.Router();

// ROUTE  GET api/users/post
// DESC   Gets Test User Route
// ACCESS Public
router.get("/test", (req, res) => {
  res.json({
    msg: "USERS Works"
  });
});

module.exports = router;
