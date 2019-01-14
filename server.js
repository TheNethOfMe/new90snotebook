// Import npm dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Inport api routes
const users = require("./data/api/users");
const profile = require("./data/api/profile");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys_dev").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Map Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", users);
app.use("/api/profile", profile);

// Create Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
