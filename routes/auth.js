const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");  

// Login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Developers page
router.get("/developers", (req, res) => {
  const isAdmin = req.session.user && req.session.user.role === 'admin';
  res.render("developers", { isAdmin });
});


//otp
router.get("/otp", (req, res) => {
  res.render("otp", { error: null, otp: null });
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { username, voterId } = req.body;
   try {
    const voter = await Voter.findOne({
      username,
       voterId
    });

    if (!voter) {
      console.log("Voter not found");
      return res.render("login", { error: "Invalid username or voter ID" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    // Store voter data and OTP in session
    req.session.otp = otp;
    req.session.voter = {
      username: username,
      voterId: voterId
    };

    console.log("OTP:", otp);
    console.log("Voter data stored in session for:", username);

    res.render("otp", { otp });

  } catch (error) {
    console.error("Error checking voter:", error);
    res.render("login", { error: "An error occurred. Please try again." });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!req.session.otp || !req.session.voter) {
    console.log("Session expired or voter data missing");
    return res.render("login", { error: "Session expired. Please login again." });
  }

  if (parseInt(otp) === req.session.otp) {
     req.session.user = {
      username: req.session.voter.username,
      voterId: req.session.voter.voterId,
      role: "voter"
    };
    console.log("OTP verified for voter:", req.session.user.username);
    // Clear OTP from session after verification
    delete req.session.otp;
    return res.redirect("/dashboard");
  } else {
    console.log("Invalid OTP");
    return res.render("otp", { error: "Invalid OTP" });
  }
  
});


// Resend OTP
router.post("/resend-otp", (req, res) => {

  const newOtp = Math.floor(1000 + Math.random() * 9000);

  req.session.otp = newOtp;

  console.log("New OTP:", newOtp);

  res.render("otp", { error: "New OTP sent successfully!", otp: newOtp });

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

//register page
router.get("/register", (req, res) => {
  const error = null;
  const success = null;
  res.render("register", { error, success });
});

router.post("/register", async (req, res) => {
  const { username, voterId } = req.body;

  try {
    const voter = new Voter({ username, voterId });
    await voter.save();
    res.render("register", { success: "Registration successful! Please login.", error: null });
  } catch (error) {
    console.error("Error registering voter:", error);
    res.render("register", { error: "Failed to register. Please try again.", success: null });
  }
});

// Logout route (accessible from anywhere)
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});


module.exports = router;