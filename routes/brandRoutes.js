///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const brandCTRLs = require("../controllers/brandControllers");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router.route("/").post(protect, brandCTRLs.addBrand).get(brandCTRLs.getBrands);
router
  .route("/:brandId")
  .delete(protect, brandCTRLs.deleteBrand)
  .put(protect, brandCTRLs.editBrand);

//// export route ////
module.exports = router;
