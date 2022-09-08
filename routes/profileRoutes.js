const {
  editProfile,
  editProfileImage,
} = require("../controllers/profileControllers");
const protect = require("../config/authMiddleware");
const multer = require("../config/multer");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router.route("/").put(protect, editProfile);
router.route("/image").put(
  protect,
  multer.single("avatar"),
  (err, req, res, next) => {
    if (err) {
      const errors = {};
      errors.avatar = err.message;
      return res.status(400).json(errors);
    }
    next();
  },
  editProfileImage
);

module.exports = router;
