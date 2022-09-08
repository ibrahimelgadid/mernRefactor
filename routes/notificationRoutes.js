//---------------------------------------------|
//           All required modules              |
//---------------------------------------------|
const router = require("express").Router();
const protect = require("../config/authMiddleware");
const notificationCTRLs = require("../controllers/notificationControllers");

//---------------------------------------------|
//          GET ALL NOTIFICATION
//---------------------------------------------|
router.route("/").get(protect, notificationCTRLs.getNotifications);

//---------------------------------------------|
//       POST ADDING PROTECT NOTIFICATION
//---------------------------------------------|
router.route("/").post(protect, notificationCTRLs.addingFromAuth);

//---------------------------------------------|
//       POST ADDING NOT PROTECT NOTIFICATION
//---------------------------------------------|
router.route("/notAuth").post(notificationCTRLs.addingFromNotAuth);

//---------------------------------------------|
//          DELETE NOTIFICATION
//---------------------------------------------|
router
  .route("/:notificationId")
  .delete(protect, notificationCTRLs.deleteNotification);

//---------------------------------------------|
//           CLEAR NOTIFICATION
//---------------------------------------------|
router.route("/clear").post(protect, notificationCTRLs.clearNotifications);

module.exports = router;
