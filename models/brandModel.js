const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      set: (name) => name.trim()[0].toUpperCase() + name.trim().slice(1),
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    deleted: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("brandModel", brandSchema);
