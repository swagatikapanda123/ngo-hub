const mongoose = require("mongoose");
// mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const ngoSchema = new Schema(
  {
    Name: {
      type: String,
    },
    Location: {
      type: String,
    },

    Field: {
      type: Array,
    },
    Email: {
      type: String,
    },
    State: String,
    District: String,
    Unique_ID: String,

    Phone: Number,
    Website: {
      type: String,
    },

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

const Ngos = mongoose.model("Ngo", ngoSchema);

module.exports = Ngos;
