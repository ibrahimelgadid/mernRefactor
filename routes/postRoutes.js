///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const {
  addPost,
  getPosts,
  getPost,
  deletePost,
  editPost,
} = require("../controllers/postControllers");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router.route("/").post(protect, addPost).get(getPosts);
router
  .route("/:postId")
  .delete(protect, deletePost)
  .put(protect, editPost)
  .get(protect, getPost);

//// export route ////
module.exports = router;
