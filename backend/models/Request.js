const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    user_id: String,
    ngo_id: String,
    Name: String,
    Email: String,
    Phone: String,
    District: String,
    City: String,
    Address: String,
    Status: String,
    Request_date: String,
    Description: String,
    NgoDetails: Object,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Requests = mongoose.model("Request", requestSchema);

module.exports = Requests;
