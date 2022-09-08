const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const profileValidation = require("../validation/profileValidation");
const uniqueRecord = require("../config/uniqueRecord");
const cloudinary = require("../config/cloudinary");
const { editDeleted } = require("../config/editDeleted");

const editProfile = asyncHandler(async (req, res) => {
  // inputs validation
  const { isValid, errors } = profileValidation(req.body);
  if (!isValid) return res.status(400).json(errors);

  // if this email exists
  const { uniqe } = await uniqueRecord(
    "email",
    req.body.email,
    userModel,
    req.user.id
  );
  if (!uniqe) {
    return res.status(400).json({ email: "This email is already exists" });
  }

  // get all user data
  const userData = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    social: {
      youtube: req.body.youtube,
      facebook: req.body.facebook,
      github: req.body.github,
    },
  };

  const updateUser = await userModel.findOneAndUpdate(
    { _id: req.user.id },
    { $set: userData },
    { new: true }
  );

  if (updateUser) {
    // edit models contains deleted field
    await editDeleted(req, updateUser);
    // sign in jwt
    const userData = {
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      avatar: updateUser.avatar,
      role: updateUser.role,
      social: updateUser.social,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token: `Bearer ${token}` });
  }
});

//---------------------------------------------|
//       GET PROFILE
//---------------------------------------------|
const editProfileImage = asyncHandler(async (req, res) => {
  if (req.file) {
    const existedUser = await userModel.findOne({ _id: req.user.id });
    console.log(existedUser.avatar);
    if (
      existedUser.avatar !==
        "https://res.cloudinary.com/dbti7atfu/image/upload/v1658475872/mernRefactor/noimage_tjwdv4.png" &&
      existedUser.avatar.includes("res.cloudinary.com")
    ) {
      await cloudinary.uploader.destroy(existedUser.cloudinary_id);
    }
    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "mernRefactor/avatar",
    });

    // get all user avatar
    const userData = {
      avatar: image.secure_url,
      cloudinary_id: image.public_id,
    };

    const updateUser = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userData },
      { new: true }
    );

    if (updateUser) {
      await editDeleted(req, updateUser);

      // sign in jwt
      const userData = {
        _id: updateUser._id,
        username: updateUser.username,
        email: updateUser.email,
        avatar: updateUser.avatar,
        role: updateUser.role,
        social: updateUser.social,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).json({ token: `Bearer ${token}` });
    }
  }
});

///////// export modules ////
module.exports = {
  editProfile,
  editProfileImage,
};
