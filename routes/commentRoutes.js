///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const {
  addComment,
  deleteComment,
} = require("../controllers/commentControllers");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router.route("/:postId").post(protect, addComment);
router.route("/:postId/:commentId").delete(protect, deleteComment);

module.exports = router;
