const asyncHandler = require("express-async-handler");
const { notOwner } = require("../config/privilleges");
const uniqueRecord = require("../config/uniqueRecord");
const brandModel = require("../models/brandModel");
const brandValidation = require("../validation/brandValidation");

//=============================================================|
//                 ADD Brand
//=============================================================|
exports.addBrand = asyncHandler(async (req, res) => {
  const { errors, isValid } = brandValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // check if unique brand
  const { uniqe, result } = await uniqueRecord(
    "name",
    req.body.name,
    brandModel
  );
  if (!uniqe) {
    return res.status(400).json({ name: result });
  }

  let newBrand = new brandModel({
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
    deleted: req.user,
  });

  newBrand = await newBrand.save();
  newBrand = await newBrand.populate("user", ["username", "avatar"]);
  res.status(200).json(newBrand);
});

//=============================================================|
//                 EDIT BRAND
//=============================================================|
exports.editBrand = asyncHandler(async (req, res) => {
  const { errors, isValid } = brandValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const brand = await brandModel.findOne({ _id: req.params.brandId });

  if (!brand) {
    return res.status(400).json({ notFound: "This id not found" });
  }

  // check if unique brand
  const { uniqe, result } = await uniqueRecord(
    "name",
    req.body.name,
    brandModel,
    brand._id
  );
  if (!uniqe) {
    return res.status(400).json({ name: result });
  }

  // check if owener of this Brand
  if (notOwner(req, res, brand.user, "brand")) return;

  const updatedBrand = await brandModel
    .findOneAndUpdate(
      { _id: req.params.brandId },
      { $set: { name: req.body.name, description: req.body.description } },
      { new: true }
    )
    .populate("user", ["username", "avatar"]);
  res.status(200).json(updatedBrand);
});

//=============================================================|
//                 GET BRANDS
//=============================================================|
exports.getBrands = asyncHandler(async (req, res) => {
  const brands = await brandModel
    .find()
    .populate("user", ["username", "avatar"]);

  res.status(200).json(brands);
});

//=============================================================|
//                 DELETE Brand
//=============================================================|
exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await brandModel.findOne({ _id: req.params.brandId });

  if (!brand) {
    return res.status(400).json({ notFound: "This id not found" });
  }
  // check if owener of this Brand
  if (notOwner(req, res, brand.user, "brand")) return;

  // Delete
  await brandModel.deleteOne({ _id: req.params.brandId });
  res.status(200).json({ msg: "deleted successfully" });
});
