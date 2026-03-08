const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");  

// Login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});




// Send OTP
router.post("/send-otp", async (req, res) => {
    const { username, voterId, phone } = req.body;
    if (!username || !voterId || !phone) {
    return res.render("login", { error: "All fields are required!" });
  }
  const otp = Math.floor(1000 + Math.random() * 9000);

  req.session.otp = otp;

  req.session.voter = {
    username,
    voterId,
    phone
  };

  console.log("OTP:", otp);

  res.redirect("/otp");

});


// OTP page
router.get("/otp", (req, res) => {
  res.render("otp", { error: null });
});


// Verify OTP
router.post("/verify-otp", async (req, res) => {

  const { otp } = req.body;

  if (parseInt(otp) === req.session.otp) {

    try {
      // Save voter in MongoDB
      const voter = new Voter(req.session.voter);

      await voter.save();

      req.session.user = voter;

      return res.redirect("/dashboard");
    } catch (error) {
      console.error("Error saving voter:", error);
      // Still allow login without saving, or redirect to error
      req.session.user = req.session.voter; // set without _id etc
      return res.redirect("/dashboard");
    }

  } else {

    return res.render("otp", { error: "Invalid OTP!" });

  }

});


// Resend OTP
router.post("/resend-otp", (req, res) => {

  const newOtp = Math.floor(1000 + Math.random() * 9000);

  req.session.otp = newOtp;

  console.log("New OTP:", newOtp);

  res.render("otp", { error: "New OTP sent successfully!" });

});


// Admin login (temporary demo admin)
router.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
       req.session.user = {
      username: "admin",
      role: "admin"
    };
    return res.redirect("/admin");

  } else {
    console.log("Invalid credentials");
    return res.render("login", { error: "Invalid username or password" });
  }

});


module.exports = router;