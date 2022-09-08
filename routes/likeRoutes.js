///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const { like, unlike } = require("../controllers/likeControllers");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router.route("/:postId").post(protect, like);
router.route("/:postId").delete(protect, unlike);

module.exports = router;
