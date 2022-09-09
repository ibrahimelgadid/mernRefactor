const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");

//=============================================================|
//                 ADD ITEM TO CART
//=============================================================|
exports.addItem = asyncHandler(async (req, res) => {
  const { itemId, name } = req.body;
  const price = parseInt(req.body.price);
  const cartId = req.user.id;
  const newItem = {
    _id: itemId,
    name,
    price: price,
    qty: 1,
  };

  const existsCart = await cartModel.findOne({ _id: cartId });

  // if no cart exists
  if (!existsCart) {
    let newCartItem = new cartModel({
      _id: cartId,
      totalPrice: price,
      totalQty: 1,
      selectedItem: [newItem],
    });
    newCartItem = await newCartItem.save();
    res.status(200).json(newCartItem);
  } else {
    // if exist cart and exist item inside
    const existsItemInCart = existsCart.selectedItem
      .map((item) => item._id)
      .indexOf(itemId);
    if (existsItemInCart !== -1) {
      const currentSelectedItem = existsCart.selectedItem[existsItemInCart];
      existsCart.totalPrice += price;
      existsCart.totalQty += 1;
      currentSelectedItem.price += price;
      currentSelectedItem.qty += 1;

      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: existsCart },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } else {
      // if exist cart and but not exist item inside
      existsCart.totalPrice += price;
      existsCart.totalQty += 1;
      existsCart.selectedItem.push(newItem);
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: existsCart },
        { new: true }
      );
      res.status(200).json(updatedCart);
    }
  }
  return;
});

//=============================================================|
//                 GET CART ITEMS
//=============================================================|
exports.getItems = asyncHandler(async (req, res) => {
  const cart = await cartModel.findOne({ _id: req.user?.id });
  res.status(200).json(cart);
});

//=============================================================|
//                 DELETE ITEM FROM CART
//=============================================================|
exports.deleteItem = asyncHandler(async (req, res) => {
  let cart = await cartModel.findOne({ _id: req.user.id });

  const selectedItemIndex = cart.selectedItem
    .map((product) => product._id)
    .indexOf(req.body.itemId);

  if (selectedItemIndex === -1) {
    return res.status(400).json({ err: "this item not exists" });
  } else {
    cart.totalPrice -= cart.selectedItem[selectedItemIndex].price;

    cart.totalQty -= cart.selectedItem[selectedItemIndex].qty;
    cart.selectedItem.splice(selectedItemIndex, 1);

    cart = await cartModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: cart },
      { new: true }
    );
    res.status(200).json(cart);
  }
});

//---------------------------------------------|
//           INCREASE CART PRODUCT COUNT
//---------------------------------------------|
exports.increaseItemByOne = asyncHandler(async (req, res) => {
  const { index, price } = req.body;

  let cart = await cartModel.findOne({ _id: req.user.id });
  const selectedItemIndex = cart.selectedItem[index];

  if (selectedItemIndex === -1) {
    return res.status(400).json({ err: "this item not exists" });
  } else {
    cart.totalPrice += price;
    cart.totalQty += 1;
    cart.selectedItem[index].price += price;
    cart.selectedItem[index].qty += 1;

    cart = await cartModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: cart },
      { new: true }
    );
    res.status(200).json(cart);
  }
});

//---------------------------------------------|
//           DECREASE CART PRODUCT COUNT
//---------------------------------------------|
exports.decreaseItemByOne = asyncHandler(async (req, res) => {
  const { index, price } = req.body;

  let cart = await cartModel.findOne({ _id: req.user.id });
  const selectedItemIndex = cart.selectedItem[index];

  if (selectedItemIndex === -1) {
    return res.status(400).json({ err: "this item not exists" });
  } else {
    if (cart.selectedItem[index].qty === 1) return;
    cart.totalPrice -= price;
    cart.totalQty -= 1;
    cart.selectedItem[index].price -= price;
    cart.selectedItem[index].qty -= 1;

    cart = await cartModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: cart },
      { new: true }
    );
    res.status(200).json(cart);
  }
});

//---------------------------------------------|
//           CHANGE CART ITEM COUNT BY VALUE
//---------------------------------------------|
exports.changeItemValue = asyncHandler(async (req, res) => {
  const { index, qty, price } = req.body;

  let cart = await cartModel.findOne({ _id: req.user.id });
  const selectedItemIndex = cart.selectedItem[index];

  if (selectedItemIndex === -1) {
    return res.status(400).json({ err: "this item not exists" });
  } else {
    if (qty < 1) {
      return res.status(400).json({ err: "Value must be one or more" });
    }
    cart.totalPrice -= cart.selectedItem[index].price;
    cart.totalQty -= cart.selectedItem[index].qty;

    cart.totalPrice += price * qty;
    cart.totalQty += qty;

    cart.selectedItem[index].price = price * qty;
    cart.selectedItem[index].qty = qty;

    cart = await cartModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: cart },
      { new: true }
    );
    res.status(200).json(cart);
  }
});
//=============================================================|
//                 ADD ITEM TO CART
//=============================================================|
exports.clearItems = asyncHandler(async (req, res) => {});
