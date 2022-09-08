//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const orderValidation = require("../validation/orderValidation");

//---------------------------------------------|
//           POST VALIDATE ORDER
//---------------------------------------------|

exports.validateOrder = asyncHandler(async (req, res) => {
  const { isValid, errors } = orderValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  res.sendStatus(200);
});
//---------------------------------------------|
//           POST NEW ORDER
//---------------------------------------------|
exports.addOrder = asyncHandler(async (req, res) => {
  const cart = await cartModel.findById({ _id: req.user.id });
  if (cart.totalQty > 0) {
    const newOrderModel = new orderModel({
      orderOwner: req.user.id,
      cart,
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      paymentId: req.body.paymentId,
      deleted: req.user,
    });
    const newOrder = await newOrderModel.save();
    if (newOrder) {
      await cartModel.deleteOne({ _id: req.user.id });
      return res.status(200).json("order");
    }
  } else {
    return res.status(400).json({ noCartItems: "Cart has no items" });
  }
});

//---------------------------------------------|
//           GET ALL ORDERS fOR ADMIN
//---------------------------------------------|
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find().populate("orderOwner", "username");
  return res.status(200).json(orders);
});

//---------------------------------------------|
//          GET ALL ORDERS fOR USER
//---------------------------------------------|
exports.getOrdersForUsers = asyncHandler(async (req, res) => {
  const orders = await orderModel
    .find({ orderOwner: req.user.id })
    .populate("orderOwner", "username");
  return res.status(200).json(orders);
});

//---------------------------------------------|
//               GET ORDER BY ID
//---------------------------------------------|
exports.getOrderId = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findOne({ _id: req.params.orderId })
    .populate("orderOwner", "username");
  return res.status(200).json(order);
});

//---------------------------------------------|
//               UPDATE ORDER BY ID
//---------------------------------------------|
exports.updatedOrder = asyncHandler(async (req, res) => {
  const updatedOrder = await orderModel
    .findOneAndUpdate(
      { _id: req.params.orderId },
      { $set: { status: req.body.status } },
      { new: true }
    )
    .populate("orderOwner", "username");
  console.log(updatedOrder);
  return res.status(200).json(updatedOrder);
});

//---------------------------------------------|
//              DELETE ORDER
//---------------------------------------------|
exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.deleteOne({ _id: req.body.orderId });

  if (order) {
    res.status(200).json(order);
  }
});
