const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    deleted: {
      type: Object,
      require: true,
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "userModel",
        },
      },
    ],
    unlikes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "userModel",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "userModel",
        },
        comment: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("postModel", postSchema);
