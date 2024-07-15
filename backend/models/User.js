const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["NGO", "Volunteer", "Admin"], // only allow these values
    },
    // profile_picture: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
