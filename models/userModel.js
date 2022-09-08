const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const userSchema = new schema(
  {
    username: {
      type: String,
      set: (username) => (username[0].toUpperCase() + username.slice(1)).trim(),
      required: true,
    },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    facebookId: { type: String },
    githubId: { type: String },
    password: { type: String },
    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dbti7atfu/image/upload/v1658475872/mernRefactor/noimage_tjwdv4.png",
    },
    cloudinary_id: {
      type: String,
    },
    role: { type: String, default: "user" },
    social: {
      youtube: { type: String },
      github: { type: String },
      facebook: { type: String },
    },
  },
  { timestamps: true }
);

// required password if no login with google
userSchema.path("password").required(function () {
  return (
    this.googleId == undefined &&
    this.facebookId == undefined &&
    this.githubId == undefined
  );
});

// encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.googleId && !this.facebookId && !this.githubId) {
    if (!this.isModified("password")) return next();
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }
});

// check if password match for user login
userSchema.methods.isMatchPassword = async function (bodyPassword) {
  if (!this.googleId && !this.facebookId && !this.githubId) {
    return await bcryptjs.compare(bodyPassword, this.password);
  }
};

module.exports = mongoose.model("userModel", userSchema);
