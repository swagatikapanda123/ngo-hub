const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    Name: {
      type: String,
    },
    Location: {
      type: String,
    },

    Email: {
      type: String,
    },
    State: String,
    District: String,
    Phone: Number,
    isDeleted: Boolean,
    isActive: Boolean,
    Password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
