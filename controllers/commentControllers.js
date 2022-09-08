const asyncHandler = require("express-async-handler");
const { notOwner } = require("../config/privilleges");
const postModel = require("../models/postModel");
const commentValidation = require("../validation/commentValidation");

//---------------------------------------------|
//                 ADD COMMENT
//---------------------------------------------|
const addComment = asyncHandler(async (req, res) => {
  const { errors, isValid } = commentValidation(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  let postAfterAddComment = await postModel
    .findByIdAndUpdate(
      req.params.postId,
      {
        $push: { comments: { comment: req.body.comment, user: req.user.id } },
      },
      { new: true }
    )
    .populate("user", ["username", "avatar"])
    .populate("comments.user", ["username", "avatar"]);

  res.status(200).json(postAfterAddComment);
});

//---------------------------------------------|
//                 DELETE COMMENT
//---------------------------------------------|
const deleteComment = asyncHandler(async (req, res) => {
  //
  const post = await postModel.findOne({ _id: req.params.postId });

  // check if comment exists
  if (
    post.comments.filter(
      (comment) => comment._id.toString() === req.params.commentId
    ).length === 0
  ) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  // Get target comment index
  const targetIndex = post.comments
    .map((comment) => comment._id.toString())
    .indexOf(req.params.commentId);

  // check if owener of this comment
  if (notOwner(req, res, post.comments[targetIndex].user, "comment")) return;

  let postAfterDeletedComment = await postModel
    .findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    )
    .populate("user", ["username", "avatar"])
    .populate("comments.user", ["username", "avatar"]);

  res.status(200).json(postAfterDeletedComment);
  //
});

///////// export modules ////
module.exports = {
  addComment,
  deleteComment,
};
