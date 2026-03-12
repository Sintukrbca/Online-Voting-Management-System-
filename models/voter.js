const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  username: String,
  voterId: String,
  lastVoted: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Voter", voterSchema);