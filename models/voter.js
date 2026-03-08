const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  username: String,
  voterId: String
});

module.exports = mongoose.model("Voter", voterSchema);