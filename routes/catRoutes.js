///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const categoryCTRLs = require("../controllers/catControllers");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router
  .route("/")
  .post(protect, categoryCTRLs.addCategory)
  .get(categoryCTRLs.getCategories);
router
  .route("/:categoryId")
  .delete(protect, categoryCTRLs.deleteCategory)
  .put(protect, categoryCTRLs.editCategory);

//// export route ////
module.exports = router;
