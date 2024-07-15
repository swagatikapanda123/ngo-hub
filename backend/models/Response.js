const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  volunteer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  status: { type: String, default: "Pending" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);
