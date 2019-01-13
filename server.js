const express = require("express");
const mongoose = require("mongoose");

const users = require("./data/api/users");
const profile = require("./data/api/profile");

const app = express();
const db = require("./config/keys_dev").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/profile", profile);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
