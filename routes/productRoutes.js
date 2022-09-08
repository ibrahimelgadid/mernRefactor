///////   All required modules   /////////
const protect = require("../config/authMiddleware");
const productsCTRLs = require("../controllers/productControllers");

const router = require("express").Router();
const multer = require("../config/multer");

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router
  .route("/")
  .post(
    protect,
    multer.single("productImage"),
    (err, req, res, next) => {
      if (err) {
        const errors = {};
        errors.productImage = err.message;
        return res.status(400).json(errors);
      }
      next();
    },
    productsCTRLs.addProduct
  )
  .get(productsCTRLs.getProducts);

///////////////////////
router
  .route("/:productId")
  .delete(protect, productsCTRLs.deleteProduct)
  .put(
    protect,
    multer.single("productImage"),
    (err, req, res, next) => {
      if (err) {
        const errors = {};
        errors.productImage = err.message;
        return res.status(400).json(errors);
      }
      next();
    },
    productsCTRLs.editProduct
  )
  .get(productsCTRLs.getProduct);

///////////////
router.route("/pro/forUsers").get(productsCTRLs.getProductsForUsers);

////////////////// products filter
router.route("/pro/filter").post(productsCTRLs.getProductsByFilters);

////////////////// products search
router.route("/pro/search").post(productsCTRLs.getProductsBySearch);

////////////////// products search
router.route("/pro/sort").post(productsCTRLs.getProductsBySort);

////////////////// Upload gallary images
router.route("/gallary/:productId").post(
  protect,
  multer.array("images"),
  (err, req, res, next) => {
    if (err) {
      const errors = {};
      errors.productImage = err.message;
      return res.status(400).json(errors);
    }
    next();
  },
  productsCTRLs.uploadGallaryImages
);
////////////////// Upload gallary images
router.route("/gallary/:productId/:imgId/:cloudId(*)").delete(
  protect,

  productsCTRLs.deleteGallaryImage
);

//// export route ////
module.exports = router;
