import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/actions/postsActions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import PostEditInput from "./PostEditInput";

const PostActions = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const deletePostHND = bindActionCreators(deletePost, useDispatch());

  const deleteBTN = async () => {
    if (await deletePostHND(post._id)) {
      withReactContent(Swal).fire({
        title: "DELETED...",
        icon: "success",
        text: "Post deleted successfully",
        timer: 2000,
      });
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation}
      className="postActions shadow-lg border  absolute top-4 right-10 py-2 pl-3 pr-5 flex flex-col items-start"
    >
      <PostEditInput
        showModal={showModal}
        setShowModal={setShowModal}
        post={post}
      />
      <div className="delete cursor-pointer  mb-2" onClick={deleteBTN}>
        <FontAwesomeIcon icon={faTrash} /> Delete
      </div>
      <div className=" edit cursor-pointer" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </div>
    </div>
  );
};

export default PostActions;
