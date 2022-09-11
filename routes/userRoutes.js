const userCTLs = require("../controllers/userControllers");
const protect = require("../config/authMiddleware");
const passport = require("passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|

// auth with jwt
router.route("/register").post(userCTLs.register);
router.route("/login").post(userCTLs.login);

// auth with social media
// if login success
router.route("/login/success").get(async (req, res) => {
  const user = req.user;
  // // sign in jwt
  const userData = {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    social: user.social,
  };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ token: `Bearer ${token}` });
});

//-----> google<---------------------------------
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: process.env.app_client,
    failureRedirect: process.env.app_client + "/register",
    failureMessage: true,
  })
);

//-----> github<---------------------------------
router.route("/github").get(
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.route("/github/callback").get(
  passport.authenticate("github", {
    successRedirect: process.env.app_client,
    failureRedirect: process.env.app_client + "/register",
    failureMessage: true,
  })
);
//-----> facebook<---------------------------------
router.route("/facebook").get(
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.route("/facebook/callback").get(
  passport.authenticate("facebook", {
    successRedirect: process.env.app_client,
    failureRedirect: process.env.app_client + "/register",
    failureMessage: true,
  })
);

router.route("/").get(protect, userCTLs.registeredUsers);
router.route("/:userId").delete(protect, userCTLs.deleteUser);
router.route("/role/:userId").put(userCTLs.EditRole);

//---------------------------------------------|
//      PASSWORD RESET ROUTES
//---------------------------------------------|
// @access public

// send token to mailtrap for reset
router.route("/reset-password-email").post(userCTLs.sendEmailForResetPass);

// create new password
router.route("/reset-pass/:token/:email").post(userCTLs.resetPass);

module.exports = router;
