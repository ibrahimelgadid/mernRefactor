const asyncHandler = require("express-async-handler");
const { notOwner } = require("../config/privilleges");
const uniqueRecord = require("../config/uniqueRecord");
const productModel = require("../models/productModel");
const productValidation = require("../validation/productValidation");
const cloudinary = require("../config/cloudinary");
const isEmpty = require("../config/isEmpty");

//=============================================================|
//                 GET PRODUCTS FOR ADMINS
//=============================================================|
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await productModel
    .find()
    .sort({
      createdAt: -1,
    })
    .populate("user", ["username", "avatar"]);

  res.status(200).json(products);
});

//---------------------------------------------|
//           GET PRODUCTS BY SEARCH
//---------------------------------------------|
exports.getProductsBySearch = asyncHandler(async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const search = req.query.search;

  const limit = 2;
  const skip = (page - 1) * limit;
  const queries = {
    name: {
      $regex: search,
      $options: "i",
    },
  };
  const products = await productModel
    .find(queries)
    .populate("user", ["username", "avatar"])
    .limit(limit)
    .skip(parseInt(skip));
  const count = await productModel.count(queries);

  res.status(200).json({
    count: Math.ceil(count / limit),
    products,
  });
});
//---------------------------------------------|
//           GET PRODUCTS BY SEARCH
//---------------------------------------------|
exports.getProductsBySort = asyncHandler(async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const { selectedItem, number } = req.body;

  const limit = 2;
  const skip = (page - 1) * limit;

  const products = await productModel
    .find()
    .sort({ [selectedItem]: number })
    .populate("user", ["username", "avatar"])
    .limit(limit)
    .skip(parseInt(skip));
  const count = await productModel.count();

  res.status(200).json({
    count: Math.ceil(count / limit),
    products,
  });
});

//--------------------------------------------------------------||
//                 GET PRODUCTS BY FILTERS
//--------------------------------------------------------------||
exports.getProductsByFilters = asyncHandler(async (req, res) => {
  const { filters } = req.body;
  const { price } = req.body;
  const min = price[0],
    max = price[1];
  const page = req.query.page ? req.query.page : 1;

  const limit = 2;
  const skip = (page - 1) * limit;

  const filterQuery = !isEmpty(filters)
    ? { $or: [{ brand: { $in: filters } }, { category: { $in: filters } }] }
    : "";

  const products = await productModel
    .find({
      $and: [{ ...filterQuery }, { price: { $lte: max, $gte: min } }],
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("user", ["username", "avatar"]);

  const count = await productModel.count({
    $and: [{ ...filterQuery }, { price: { $lte: max, $gte: min } }],
  });
  console.log(count);
  res.status(200).json({
    count: Math.ceil(count / limit),
    products,
  });
});

//---------------------------------------------|
//           GET PRODUCTS FOR USERS
//---------------------------------------------|
exports.getProductsForUsers = asyncHandler(async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = 2;
  const skip = (page - 1) * limit;

  const products = await productModel
    .find()
    .populate("user", ["username"])
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(parseInt(skip));

  const count = await productModel.count();
  res.status(200).json({
    count: Math.ceil(count / limit),
    products,
  });
});

//=============================================================|
//                 ADD PRODUCT
//=============================================================|
exports.addProduct = asyncHandler(async (req, res) => {
  const { errors, isValid } = productValidation(req.body, req.file);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // check if unique product
  const { uniqe, result } = await uniqueRecord(
    "name",
    req.body.name,
    productModel
  );
  if (!uniqe) {
    return res.status(400).json({ name: result });
  }

  let newProduct = new productModel({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand,
    user: req.user.id,
    deleted: req.user,
  });

  const productImage = await cloudinary.uploader.upload(req.file.path, {
    folder: "mernRefactor/productImage",
  });

  newProduct.productImage = productImage.secure_url;
  newProduct.cloudinary_id = productImage.public_id;

  newProduct = await newProduct.save();
  newProduct = await newProduct.populate("user", ["username", "avatar"]);
  res.status(201).json(newProduct);
});

//=============================================================|
//                 EDIT PRODUCT
//=============================================================|
exports.editProduct = asyncHandler(async (req, res) => {
  const { errors, isValid } = productValidation(req.body, req.file, true);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const product = await productModel.findOne({ _id: req.params.productId });

  if (!product) {
    return res.status(400).json({ notFound: "This id not found" });
  }

  // check if unique product
  const { uniqe, result } = await uniqueRecord(
    "name",
    req.body.name,
    productModel,
    product._id
  );
  if (!uniqe) {
    return res.status(400).json({ name: result });
  }

  // check if owener of this product
  if (notOwner(req, res, product.user, "product")) return;

  //updated product object
  const updateProductModel = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand,
  };
  //delete old image and store new one
  if (req.file) {
    await cloudinary.uploader.destroy(product.cloudinary_id);
    const productImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "mernRefactor/productImage",
    });

    updateProductModel.productImage = productImage.secure_url;
    updateProductModel.cloudinary_id = productImage.public_id;
  }

  const updatedProduct = await productModel
    .findOneAndUpdate(
      { _id: req.params.productId },
      { $set: updateProductModel },
      { new: true }
    )
    .populate("user", ["username", "avatar"]);

  res.status(200).json(updatedProduct);
});

//=============================================================|
//                 GET PRODUCT
//=============================================================|
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.productId });

  if (!product) {
    return res.status(400).json({ notFound: "This id not found" });
  }
  res.status(200).json(product);
});

//=============================================================|
//                 DELETE PRODUCT
//=============================================================|
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel
    .findOne({ _id: req.params.productId })
    .select(["user", "cloudinary_id"]);

  if (!product) {
    return res.status(400).json({ notFound: "This id not found" });
  }
  // check if owener of this product
  if (notOwner(req, res, product.user, "product")) return;

  // Delete
  await productModel.deleteOne({ _id: req.params.productId });
  await cloudinary.uploader.destroy(product.cloudinary_id);

  //delete product gallary if exists

  await cloudinary.api.delete_resources_by_prefix(
    `mernRefactor/gallary/${req.params.productId}`
  );
  await cloudinary.api.delete_folder(
    `mernRefactor/gallary/${req.params.productId}`
  );

  res.status(200).json({ msg: "deleted successfully" });
});

///////////////////////////////////////////////////////////
///////////////// GALARY //////////////////////////////////
///////////////////////////////////////////////////////////

//---------------------------------------------|
//           UPLOAD PRODUCT GALLARY
//---------------------------------------------|
exports.uploadGallaryImages = asyncHandler(async (req, res) => {
  const cloudinaryImageUploadMethod = async (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(
        file,
        { folder: `mernRefactor/gallary/${req.params.productId}` },
        (err, done) => {
          if (err) return res.status(500).send("upload image error");
          resolve({ img: done.secure_url, cloudinary_id: done.public_id });
        }
      );
    });
  };

  let imagesURL = [];
  for (const file of req.files) {
    const newPath = await cloudinaryImageUploadMethod(file.path);
    imagesURL.push(newPath);
  }

  const updatedProducts = await productModel.findOneAndUpdate(
    { _id: req.params.productId },
    {
      $push: {
        productGallary: { $each: imagesURL },
      },
    },
    { new: true }
  );
  res.status(200).json(updatedProducts);
});

//---------------------------------------------|
//           DELETE IMAGES FROM GALLARY
//---------------------------------------------|
exports.deleteGallaryImage = asyncHandler(async (req, res) => {
  const updatedProducts = await productModel.findByIdAndUpdate(
    { _id: req.params.productId },
    {
      $pull: {
        productGallary: {
          _id: req.params.imgId,
        },
      },
    },
    { new: true }
  );

  await cloudinary.uploader.destroy(req.params.cloudId);
  res.status(200).json(updatedProducts);
});
