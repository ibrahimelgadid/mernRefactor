const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const userModel = require("../models/userModel");
const tokenModel = require("../models/tokenModel");
const registerValidation = require("../validation/registerValidation");
const loginValidation = require("../validation/loginValidation");
const jwt = require("jsonwebtoken");
const { isSuperAdmin } = require("../config/privilleges");
const resetPassEmailValidation = require("../validation/resetPassEmailValidation");
const resetpassValidation = require("../validation/resetpassValidation");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, password2 } = req.body;

  // inputs validation
  const { isValid, errors } = registerValidation(req.body);
  if (!isValid) return res.status(400).json(errors);
  // if this email exists
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    errors.email = "This email already exists";
    return res.status(400).json(errors);
  }

  let newUser = new userModel({
    username,
    email,
    password,
    password2,
  });

  newUser = await newUser.save();
  res.status(201).json(newUser);
});

//---------------------------------------------|
//       GET REGISTERD USERS
//---------------------------------------------|
exports.registeredUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({}).select("-password");
  res.status(200).json(users);
});

//---------------------------------------------|
//       POST LOGIN
//---------------------------------------------|
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for validation
  const { isValid, errors } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find email
  const existEmail = await userModel.findOne({ email });
  if (!existEmail) {
    return res.status(400).json({ email: "this email is not exists" });
  }

  //  compare password
  if (!req.body.googleId) {
    const matchedPassword = await existEmail.isMatchPassword(password);
    if (!matchedPassword) {
      return res.status(400).json({ password: "wrong password" });
    }
  }

  // sign in jwt
  const userData = {
    _id: existEmail._id,
    username: existEmail.username,
    email: existEmail.email,
    avatar: existEmail.avatar,
    role: existEmail.role,
    social: existEmail.social,
  };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ token: `Bearer ${token}` });
});

//---------------------------------------------|
//       PUT ROLE
//---------------------------------------------|
exports.EditRole = asyncHandler(async (req, res) => {
  const userAfterEditRole = await userModel
    .findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { role: req.body.role } },
      { new: true }
    )
    .select("-password");
  res.status(200).json(userAfterEditRole);
});

//---------------------------------------------|
//           DELETE USER BY ID
//---------------------------------------------|
exports.deleteUser = asyncHandler(async (req, res) => {
  // access for superAdmin only
  if (isSuperAdmin(req.user.role, res)) {
    const existedUser = await userModel.findOne({ _id: req.params.userId });
    if (
      existedUser.avatar !==
      "https://res.cloudinary.com/dbti7atfu/image/upload/v1658475872/mernRefactor/noimage_tjwdv4.png"
    ) {
      await cloudinary.uploader.destroy(existedUser.cloudinary_id);
    }

    const deleteUser = await userModel.deleteOne({ _id: req.params.userId });
    if (deleteUser) {
      res.status(200).json("done");
    }
  } else {
  }
});

//---------------------------------------------|
//       SEND EMAIL WITH RESET PASS TOKEN
//---------------------------------------------|
exports.sendEmailForResetPass = asyncHandler(async (req, res) => {
  const { isValid, errors } = resetPassEmailValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const token = `${Math.random(Date.now() * 580585)}`;
  const transporter = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    // port: 465, //25 2525 587 465
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: "gadelgadid@gmail.com",
    to: req.body.email,
    subject: "Reset password",
    html: `
            <h3>Follow this link to reset</h3>
            <a href="${process.env.app_client}/reset-password/${token}/${req.body.email}">Reset your password </a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  if (info) {
    await tokenModel.deleteOne();
    const newTokenModel = new tokenModel({ token });
    const tokenRes = await newTokenModel.save();

    res.status(200).json(tokenRes);
  } else {
    res.status(400).json("There's an error");
  }
});

//---------------------------------------------|
//       RESET PASS FROM EMAIL TOKEN
//---------------------------------------------|
exports.resetPass = asyncHandler(async (req, res) => {
  const { isValid, errors } = resetpassValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const existsEmail = await userModel.findOne({ email: req.params.email });
  if (existsEmail) {
    const token = await tokenModel.findOne({ token: req.params.token });
    if (token) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const updatedUser = await userModel.updateOne(
        { email: req.params.email },
        { $set: { password: hashedPassword } }
      );
      if (updatedUser) {
        res.status(200).json("done");
      }
    } else {
      errors.password = "expired token, please send another email reset";
      res.status(400).json(errors);
    }
  }
});
///////// export modules ////
