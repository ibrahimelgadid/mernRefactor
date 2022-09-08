const asyncHandler = require("express-async-handler");
const { notOwner } = require("../config/privilleges");
const uniqueRecord = require("../config/uniqueRecord");
const categoryModel = require("../models/categoryModel");
const categoryValidation = require("../validation/categoryValidation");

//=============================================================|
//                 ADD CATEGORY
//=============================================================|
const addCategory = asyncHandler(async (req, res) => {
  const { errors, isValid } = categoryValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // check if unique category
  const { uniqe, result } = await uniqueRecord(
    "name",
    req.body.name,
    categoryModel
  );
  if (!uniqe) {
    return res.status(400).json({ name: result });
  }

  let newCategory = new categoryModel({
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
    deleted: req.user,
  });

  newCategory = await newCategory.save();
  newCategory = await newCategory.populate("user", ["username", "avatar"]);
  res.status(200).json(newCategory);
});

//=============================================================|
//                 EDIT CATEGORY
//=============================================================|
const editCategory = asyncHandler(async (req, res) => {
  const { errors, isValid } = categoryValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const category = await categoryModel.findOne({ _id: req.params.categoryId });

  if (!category) {
    return res.status(400).json({ notFound: "This id not found" });
  }

  // check if unique category
  const { uniqe, result } = await uniqueRecord(
    "name",
    req.body.name,
    categoryModel,
    category._id
  );
  if (!uniqe) {
    return res.status(400).json({ name: result });
  }

  // check if owener of this category
  if (notOwner(req, res, category.user, "category")) return;

  const updatedCategory = await categoryModel
    .findOneAndUpdate(
      { _id: req.params.categoryId },
      { $set: { name: req.body.name, description: req.body.description } },
      { new: true }
    )
    .populate("user", ["username", "avatar"]);
  res.status(200).json(updatedCategory);
});

//=============================================================|
//                 GET CATEGORIES
//=============================================================|
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel
    .find()
    .populate("user", ["username", "avatar"]);

  res.status(200).json(categories);
});

//=============================================================|
//                 DELETE CATEGORY
//=============================================================|
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findOne({ _id: req.params.categoryId });

  if (!category) {
    return res.status(400).json({ notFound: "This id not found" });
  }
  // check if owener of this category
  if (notOwner(req, res, category.user, "category")) return;

  // Delete
  await categoryModel.deleteOne({ _id: req.params.categoryId });
  res.status(200).json({ msg: "deleted successfully" });
});

///////// export modules ////
module.exports = {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory,
};
