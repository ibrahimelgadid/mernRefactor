import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../redux/actions/postsActions";
import { bindActionCreators } from "redux";

const CommentInput = ({ post }) => {
  const [comment, setComment] = useState("");

  const addCommentHND = bindActionCreators(addComment, useDispatch());
  const { user } = useSelector((state) => state.authReducer);

  // send post data
  const submitComment = async (e) => {
    e.preventDefault();

    if (await addCommentHND({ comment }, post._id)) {
      setComment("");
    }
  };

  return (
    <div className="my-4 flex items-center">
      <img
        src={user.avatar}
        alt=""
        className="mr-1 w-10 h-10 rounded-full"
      ></img>
      <form className="w-full" onSubmit={submitComment}>
        <input
          name="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="let your comment"
        />
      </form>
    </div>
  );
};

export default CommentInput;
