const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const Voter = require("../models/voter");

// helper middleware to protect admin routes
function ensureAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  // not logged in as admin, send to login page
  return res.redirect('/login');
}

// Admin panel
router.get("/", ensureAdmin, async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.render("admin", { candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.render("admin", { candidates: [] }); // render with empty list
  }
});

// Add candidate
router.post("/add-candidate", ensureAdmin, async (req, res) => {
  try {
    const { name, party } = req.body;

    const candidate = new Candidate({
      name,
      party
    });

    await candidate.save();

    res.redirect("/admin");
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.redirect("/admin"); // redirect back, perhaps with error
  }
});

// Delete candidate
router.get("/delete/:id", ensureAdmin, async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});



// Add voter form
router.get("/add-voters", ensureAdmin, (req, res) => {
  res.render("add-voters", { success: null, error: null });
});

router.post("/add-voter", ensureAdmin, async (req, res) => {
  const { username, voterId } = req.body;

  try {
    const voter = new Voter({ username, voterId });
    await voter.save();
    res.render("add-voters", { success: "Voter added successfully!", error: null });
  } catch (error) {
    console.error("Error adding voter:", error);
    res.render("add-voters", { error: "Failed to add voter. Please try again.", success: null });
  }
});


module.exports = router;

