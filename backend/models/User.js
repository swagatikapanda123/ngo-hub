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
      enum: ["NGO", "Volunteer", "Admin"],
    },
    state: { type: String }, // Only for NGOs
    city: { type: String }, // Only for NGOs
    pin: { type: Number }, // Only for NGOs
    fields_of_work: { type: [String] }, // Array to store multiple fields (education, women welfare, etc.)
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
