const express = require("express");
const router = express.Router();
// adjust path to match modules directory
const Candidate = require("../models/Candidate");

// simple middleware to require a logged-in user
function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
}

// Dashboard
router.get("/dashboard", ensureLoggedIn, async (req, res) => {
  const candidates = await Candidate.find();
  res.render("dashboard", { candidates });
});

// Vote
router.post("/vote/:id", ensureLoggedIn, async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  candidate.votes += 1;
  await candidate.save();
  res.redirect("/success");
});

// Success page
router.get("/success", ensureLoggedIn, (req,res)=>{
  res.render("success");
});

// Results
router.get("/results", async (req, res) => {
  const candidates = await Candidate.find();
  res.render("result", { candidates, user: req.session.user });
});
// Logout
router.get("/logout", (req, res) => {
  // destroy session and clear cookie
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
    }
    res.clearCookie('connect.sid');
    // redirect to login page after logout
    res.redirect("/login");
  });
});


module.exports = router;