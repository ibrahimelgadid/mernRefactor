const cartCRTLs = require("../controllers/cartControllers");
const protect = require("../config/authMiddleware");

const router = require("express").Router();

//---------------------------------------------|
//             ROUTES
//---------------------------------------------|
router
  .route("/")
  .get(protect, cartCRTLs.getItems)
  .post(protect, cartCRTLs.addItem);
router.route("/delete").post(protect, cartCRTLs.deleteItem);
router.route("/increase").post(protect, cartCRTLs.increaseItemByOne);
router.route("/decrease").post(protect, cartCRTLs.decreaseItemByOne);
router.route("/value").post(protect, cartCRTLs.changeItemValue);
router.route("/clear").delete(protect, cartCRTLs.clearItems);

module.exports = router;
