// Import npm dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Inport api routes
const users = require("./data/api/users");
const profile = require("./data/api/profile");
const notifications = require("./data/api/notifications");
const friends = require("./data/api/friends");
const posts = require("./data/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Strategry
require("./config/passport.js")(passport);

// Map Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/notification", notifications);
app.use("/api/friends", friends);
app.use("/api/posts", posts);

// Serve Static Routes if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Create Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
