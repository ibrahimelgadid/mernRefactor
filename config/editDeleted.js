const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const brandModel = require("../models/brandModel");
const notificationModel = require("../models/notificationModel");
const orderModel = require("../models/orderModel");
const postModel = require("../models/postModel");

exports.editDeleted = async (req, updateUser) => {
  await productModel.updateMany(
    { user: req.user.id },
    { $set: { deleted: updateUser } }
  );
  await brandModel.updateMany(
    { user: req.user.id },
    { $set: { deleted: updateUser } }
  );
  await categoryModel.updateMany(
    { user: req.user.id },
    { $set: { deleted: updateUser } }
  );
  await orderModel.updateMany(
    { orderOwner: req.user.id },
    { $set: { deleted: updateUser } }
  );
  await notificationModel.updateMany(
    { from: req.user.id },
    { $set: { deleted: updateUser } }
  );
  await postModel.updateMany(
    { user: req.user.id },
    { $set: { deleted: updateUser } }
  );
};
