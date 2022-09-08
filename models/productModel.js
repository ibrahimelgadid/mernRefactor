const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      set: (name) => name.trim()[0].toUpperCase() + name.trim().slice(1),
    },

    price: { type: Number, required: true },

    category: { type: String, required: true },

    brand: { type: String, required: true },

    productImage: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
    },

    productGallary: [
      { img: { type: String }, cloudinary_id: { type: String } },
    ],

    user: { type: Schema.Types.ObjectId, ref: "userModel" },

    deleted: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productModel", productSchema);
