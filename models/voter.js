const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  username: String,
  voterId: String,
  lastVoted: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    default: "Not Voted"
  }
});

module.exports = mongoose.model("Voter", voterSchema);