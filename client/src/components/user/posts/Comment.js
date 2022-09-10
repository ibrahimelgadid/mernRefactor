import React from "react";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../redux/actions/postsActions";
import { confirmToDelete } from "../../../utilis/confirmToDelete";
import { isOwner } from "../../../utilis/actionsShow";

const Comment = ({ post, comment }) => {
  const deleteCommentHND = bindActionCreators(deleteComment, useDispatch());

  return (
    <div className="commentsShow my-4 flex items-center group">
      <img
        src={comment.user?.avatar || "../../../../imgs/imm.png"}
        alt=""
        className="me-2 h-6 w-6 rounded-full"
      />
      <p className="commentBody me-3 ">{comment.comment}</p>
      {isOwner(comment.user?._id) ? (
        <span
          onClick={() =>
            confirmToDelete(
              "Comment",
              deleteCommentHND,
              post._id + "/" + comment._id
            )
          }
          className="cursor-pointer px-1 duration-500 rounded-lg text-white  group-hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={faRemove} size="lg" />
        </span>
      ) : null}
    </div>
  );
};

export default Comment;
