const asyncHandler = require("express-async-handler");
const postModel = require("../models/postModel");

//---------------------------------------------|
//                 ADD COMMENT
//---------------------------------------------|
const like = asyncHandler(async (req, res) => {
  //
  const post = await postModel.findOne({ _id: req.params.postId });
  let postAfterAddLike;

  // check if unliked this post
  if (
    post.unlikes.filter((unlike) => unlike.user.toString() === req.user.id)
      .length > 0
  ) {
    // if exists delete unlike
    await postModel.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { unlikes: { user: req.user.id } } },
      { new: true }
    );
  }

  // check if liked this post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length < 1
  ) {
    // if not exist add like
    postAfterAddLike = await postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { $push: { likes: { user: req.user.id } } },
        { new: true }
      )
      .populate("user", ["username", "avatar"])
      .populate("comments.user", ["username", "avatar"])
      .populate("likes.user", ["username", "avatar"])
      .populate("unlikes.user", ["username", "avatar"]);
  } else {
    // if exists delete like
    postAfterAddLike = await postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { likes: { user: req.user.id } } },
        { new: true }
      )
      .populate("user", ["username", "avatar"])
      .populate("comments.user", ["username", "avatar"])
      .populate("likes.user", ["username", "avatar"])
      .populate("unlikes.user", ["username", "avatar"]);
  }

  res.status(200).json(postAfterAddLike);
});

//---------------------------------------------|
//                 DELETE COMMENT
//---------------------------------------------|
const unlike = asyncHandler(async (req, res) => {
  //
  //
  const post = await postModel.findOne({ _id: req.params.postId });
  let postAfterAddUnLike;

  // check if unliked this post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    // if exists delete unlike
    await postModel.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { likes: { user: req.user.id } } },
      { new: true }
    );
  }

  // check if liked this post
  if (
    post.unlikes.filter((unlike) => unlike.user.toString() === req.user.id)
      .length < 1
  ) {
    // if not exist add like
    postAfterAddUnLike = await postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { $push: { unlikes: { user: req.user.id } } },
        { new: true }
      )
      .populate("user", ["username", "avatar"])
      .populate("comments.user", ["username", "avatar"])
      .populate("likes.user", ["username", "avatar"])
      .populate("unlikes.user", ["username", "avatar"]);
  } else {
    // if exists delete like
    postAfterAddUnLike = await postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { unlikes: { user: req.user.id } } },
        { new: true }
      )
      .populate("user", ["username", "avatar"])
      .populate("comments.user", ["username", "avatar"])
      .populate("likes.user", ["username", "avatar"])
      .populate("unlikes.user", ["username", "avatar"]);
  }

  res.status(200).json(postAfterAddUnLike);
});

///////// export modules ////
module.exports = {
  like,
  unlike,
};
