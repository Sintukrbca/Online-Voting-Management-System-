const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const Voter = require("../models/voter");




// Admin panel
router.get("/", async (req, res) => {
  success = null;
  error = null;


  if (req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  res.render("admin", { success, error });
});

// Add candidate
router.post("/add-candidate", async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  try {
    const { name, party } = req.body;

    const candidate = new Candidate({
      name,
      party
    });
    await candidate.save();

    res.render("admin", { success: "Candidate added successfully!" });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.render("admin", { error: "Failed to add candidate. Please try again." });
  }
});

// View candidates
router.get("/candidates", async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  const candidates = await Candidate.find();
  res.render("candidates", { candidates });
});

// Delete candidate
router.get("/delete/:id", async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.redirect("/admin/candidates");
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.redirect("/admin/candidates");
  }
});





// Add voter form
router.post("/add-voter", async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  const { username, voterId } = req.body;

  try {
    const voter = new Voter({ username, voterId });
    await voter.save();
    res.render("admin", { success: "Voter added successfully!", error: null });
  } catch (error) {
    console.error("Error adding voter:", error);
    res.render("admin", { error: "Failed to add voter. Please try again.", success: null });
  }
});


// View voters
router.get("/voters", async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  const voters = await Voter.find();
  res.render("voters", { voters });
});

//delete voter
router.get("/delete-voter/:id", async (req, res) => {
  try {
    await Voter.findByIdAndDelete(req.params.id);
    res.redirect("/admin/voters");
  } catch (error) {
    console.error("Error deleting voter:", error);
    res.redirect("/admin/voters");
  }
});

// Results
router.get("/result", async (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  const candidates = await Candidate.find();
  res.render("result", { candidates, user: req.session.user });
});

// View developers page
router.get("/developers", (req, res) => {
  res.render("developers");
});


module.exports = router;

