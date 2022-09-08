///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const {
  addCategory,
  getCategories,
  deleteCategory,
  editCategory,
} = require("../controllers/CategoryControllers");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router.route("/").post(protect, addCategory).get(getCategories);
router
  .route("/:categoryId")
  .delete(protect, deleteCategory)
  .put(protect, editCategory);

//// export route ////
module.exports = router;
