const asyncHandler = require("express-async-handler");
const { notOwner } = require("../config/privilleges");
const postModel = require("../models/postModel");
const postValidation = require("../validation/postValidation");

//=============================================================|
//                 ADD POST
//=============================================================|
const addPost = asyncHandler(async (req, res) => {
  const { errors, isValid } = postValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  let newPost = new postModel({
    text: req.body.text,
    user: req.user.id,
    deleted: req.user,
  });

  newPost = await newPost.save();

  newPost = await postModel.populate(newPost, {
    path: "user",
    select: ["username", "avatar"],
  });
  res.status(200).json(newPost);
});

//=============================================================|
//                 EDIT POST
//=============================================================|
const editPost = asyncHandler(async (req, res) => {
  const { errors, isValid } = postValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const post = await postModel.findOne({ _id: req.params.postId });

  if (!post) {
    return res.status(400).json({ notFound: "This id not found" });
  }

  // check if owener of this post
  if (notOwner(req, res, post.user, "post")) return;

  const updatedPost = await postModel
    .findOneAndUpdate(
      { _id: req.params.postId },
      { $set: { text: req.body.text } },
      { new: true }
    )
    .populate("user", ["username", "avatar"])
    .populate("comments.user", ["username", "avatar"]);
  res.status(200).json(updatedPost);
});

//=============================================================|
//                 GET POSTS
//=============================================================|
const getPosts = asyncHandler(async (req, res) => {
  const posts = await postModel
    .find()
    .populate("user", ["username", "avatar"])
    .populate("comments.user", ["username", "avatar"]);

  res.status(200).json(posts);
});

//=============================================================|
//                 GET POST
//=============================================================|
const getPost = asyncHandler(async (req, res) => {
  const post = await postModel
    .findOne({ _id: req.params.postId })
    .populate("user", ["username", "avatar"])
    .populate("comments.user", ["username", "avatar"]);

  res.status(200).json(post);
});

//=============================================================|
//                 DELETE POST
//=============================================================|
const deletePost = asyncHandler(async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.postId });

  if (!post) {
    return res.status(400).json({ notFound: "This id not found" });
  }
  // check if owener of this post
  if (notOwner(req, res, post.user, "post")) return;

  // Delete
  await postModel.deleteOne({ _id: req.params.postId });
  res.status(200).json({ msg: "deleted successfully" });
});

///////// export modules ////
module.exports = {
  addPost,
  getPosts,
  getPost,
  editPost,
  deletePost,
};
