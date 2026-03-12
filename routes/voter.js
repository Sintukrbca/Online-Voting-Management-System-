const express = require("express");
const router = express.Router();
// adjust path to match modules directory
const Candidate = require("../models/Candidate");
const Voter = require("../models/voter");

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
  try {
    const voter = await Voter.findOne({
      username: req.session.user.username,
      voterId: req.session.user.voterId
    });

    if (!voter) {
      return res.render("dashboard", {
        error: "Voter record not found",
        candidates: await Candidate.find()
      });
    }

    // Check if voter already voted today
    const voted = new Date();
    voted.setHours(0, 0, 0, 0);
    if (voter.lastVoted) {
      const lastVotedDate = new Date(voter.lastVoted);
      lastVotedDate.setHours(0, 0, 0, 0);
      if (lastVotedDate.getTime() === voted.getTime()) {
        return res.send(`
          <script>
            alert("You have already voted ☑ ");
            window.location.href = "/dashboard";
          </script>
        `);
      }
    }

    // Record the vote
    const candidate = await Candidate.findById(req.params.id);
    candidate.votes += 1;
    await candidate.save();

    // Update voter's last voted date
    voter.lastVotedDate = new Date();
    await voter.save();

    console.log(`Voter ${voter.username} voted at ${voter.lastVotedDate}`);
    res.redirect("/success");
  } catch (error) {
    console.error("Error during voting:", error);
    res.render("dashboard", {
      error: "An error occurred while voting. Please try again.",
      candidates: await Candidate.find()
    });
  }
});

// Success page
router.get("/success", ensureLoggedIn, (req, res) => {
  res.render("success");
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