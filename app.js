require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();

// MongoDB connection
require("./db");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const voteRoutes = require("./routes/voter");


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(session({
  secret: process.env.SESSION_SECRET || "fallback_secret_change_in_production",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Routes
app.use("/", authRoutes);
app.use("/", voteRoutes);
app.use("/admin", adminRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});

module.exports = app;