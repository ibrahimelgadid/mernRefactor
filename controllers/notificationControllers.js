//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const notificationModel = require("../models/notificationModel");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//---------------------------------------------|
//           GET NOTIFICATIONS
//---------------------------------------------|
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationModel
    .find({ to: { $regex: req.user.id } })
    .populate("from", ["username"])
    .sort({ createdAt: -1 });
  res.status(200).json(notifications);
});

//-------------------------------------------------|
//  POST N: ADD FROM AUTH
//-------------------------------------------------|
exports.addingFromNotAuth = asyncHandler(async (req, res) => {
  const { type } = req.body;
  const to = await userModel.find({ role: { $in: ["admin", "superAdmin"] } });

  let newNotification = new notificationModel({
    from: req.user.id,
    data: req.body.data,
    type,
    to: to.map((user) => user.id),
  });

  newNotification = await newNotification.save();
  newNotification = await newNotification.populate("from", [
    "username",
    "avatar",
  ]);
  res.status(201).json(newNotification);
});

//-------------------------------------------------|
//  POST N: FROM NOT AUTH
//-------------------------------------------------|
exports.addingFromAuth = asyncHandler(async (req, res) => {
  const { type, roleToSee } = req.body;
  const to = await userModel.find({ role: { $in: roleToSee } });

  let newNotification = new notificationModel({
    from: req.user.id,
    data: req.body.data,
    type,
    to: to.map((user) => user.id),
    deleted: req.user,
  });

  newNotification = await newNotification.save();
  newNotification = await newNotification.populate("from", [
    "username",
    "avatar",
  ]);
  res.status(201).json(newNotification);
});

//---------------------------------------------|
//          DELETE NOTIFICATION
//---------------------------------------------|
exports.deleteNotification = asyncHandler(async (req, res) => {
  const updatedNotification = await notificationModel.findOneAndUpdate(
    { _id: req.params.notificationId },
    { $pull: { to: req.user.id } },
    { new: true }
  );

  if (updatedNotification.to.length < 1) {
    await notificationModel.deleteOne({ _id: req.params.notificationId });
    res.status(200).json("delete");
  } else {
    res.status(200).json("delete");
  }
});

//---------------------------------------------|
//          CLEAR NOTIFICATIONS
//---------------------------------------------|
exports.clearNotifications = asyncHandler(async (req, res) => {
  // get all notifis have my id
  const allMyNotifications = await notificationModel.find({
    to: { $regex: req.user.id },
  });
  // array of my IDs
  const ids = allMyNotifications.map((n) => n._id);

  // pull my id from all notifications
  await notificationModel.updateMany(
    { _id: { $in: ids } },
    { $pull: { to: req.user.id } },
    { new: true }
  );
  // delete notifications that not contain any id
  await notificationModel.deleteMany({ to: { $size: 0 } });
  res.status(200).json("clear");
});
