const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  voterId: {
    type: String,
    required: true,
    unique: true
  },
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