const express = require("express");
const router = express.Router();
// adjust path to match modules directory
const Candidate = require("../models/Candidate");

// Dashboard
router.get("/dashboard", async (req, res) => {

  const candidates = await Candidate.find();

  res.render("dashboard", { candidates });

});

// Vote
router.post("/vote/:id", async (req, res) => {

  const candidate = await Candidate.findById(req.params.id);

  candidate.votes += 1;

  await candidate.save();

  res.redirect("/success");

});

// Success page
router.get("/success",(req,res)=>{
  res.render("success");
});

// Results
router.get("/results", async (req, res) => {

  const candidates = await Candidate.find();

  res.render("result", { candidates });

});

module.exports = router;