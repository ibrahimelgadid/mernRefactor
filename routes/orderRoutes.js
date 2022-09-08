//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const router = require("express").Router();
const orderCTRLs = require("../controllers/orderControllers");
const protect = require("../config/authMiddleware");

//---------------------------------------------|
//         VALIDATE ORDER BEFOR ADDING
//---------------------------------------------|
router.route("/validate").post(protect, orderCTRLs.validateOrder);

//---------------------------------------------|
//              POST NEW ORDER
//---------------------------------------------|
router.route("/").post(protect, orderCTRLs.addOrder);

//---------------------------------------------|
//         GET ALL ORDERS fOR ADMIN
//---------------------------------------------|
router.route("/admins").get(protect, orderCTRLs.getOrders);

//---------------------------------------------|
//          GET ALL ORDERS fOR USER
//---------------------------------------------|
router.route("/").get(protect, orderCTRLs.getOrdersForUsers);

//---------------------------------------------|
//               GET ORDER BY ID
//---------------------------------------------|
router.route("/:orderId").get(protect, orderCTRLs.getOrderId);

//---------------------------------------------|
//               UPDATE ORDER BY ID
//---------------------------------------------|
router.route("/:orderId").put(protect, orderCTRLs.updatedOrder);

//---------------------------------------------|
//              DELETE ORDER
//---------------------------------------------|
router.route("/delete").post(protect, orderCTRLs.deleteOrder);

module.exports = router;
