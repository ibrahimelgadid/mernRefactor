import React, { useState } from "react";
import {
  faCalendarDays,
  faCommentDots,
  faEllipsisVertical,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import CommentInput from "./CommentInput";
import Comment from "./Comment";
import PostActions from "./PostActions";
import { bindActionCreators } from "redux";
import { likePost, unLikePost } from "../../../redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
import { isOwner, isSuperAdmin } from "../../../utilis/actionsShow";
import Moment from "react-moment";

const Post = ({ post }) => {
  const [postActions, setPostActions] = useState(false);

  const addLikeHND = bindActionCreators(likePost, useDispatch());
  const addUnLikeHND = bindActionCreators(unLikePost, useDispatch());
  const { user } = useSelector((state) => state.authReducer);

  //check if current user like this post
  const isLikedPost = post.likes.some(
    (like) => like.user?._id === user._id || like.deleted?._id === user._id
  );

  //check if current user like this post
  const isUnLikedPost = post.unlikes.some(
    (unlike) =>
      unlike.user?._id === user._id || unlike.deleted?._id === user._id
  );

  const submitLike = async () => {
    await addLikeHND(post._id);
  };

  // unlike post
  const submitUnLike = async () => {
    await addUnLikeHND(post._id);
  };

  return (
    <div className="container mx-auto my-10 bg-white relative">
      {/* post actions */}
      {postActions ? <PostActions post={post} /> : null}

      <div className="px-5  shadow-md rounded-md py-5">
        <div className="top flex justify-between">
          <div className="image w-12 flex justify-start items-center">
            <img
              src={post.user?.avatar || "../../../../imgs/imm.png"}
              alt=""
              className="w-auto rounded-full mr-3"
            />
            <span>
              {post.user?.username || <del>{post.deleted.username}</del>}
            </span>
          </div>
          {isOwner(post.user?._id) || isSuperAdmin() ? (
            <div
              className="bullets cursor-pointer"
              onClick={() => setPostActions(!postActions)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          ) : null}
        </div>

        <div className="text-start py-5 middle">{post.text}</div>
        <hr />
        <div className="bottom flex text-gray-600  mt-3">
          <div className="date mr-7">
            <FontAwesomeIcon icon={faCalendarDays} size="lg" className="mr-1" />

            <Moment fromNow>{post.createdAt}</Moment>
          </div>
          <div className="comments mr-7">
            <FontAwesomeIcon icon={faCommentDots} size="lg" className="mr-1" />
            <span className="font-medium">{post.comments.length}</span>
          </div>
          <div className="likes">
            <span
              onClick={submitLike}
              className={classnames("like mr-2 cursor-pointer ", {
                "text-indigo-500": isLikedPost,
              })}
            >
              <FontAwesomeIcon icon={faThumbsUp} size="lg" />
              <span className="font-medium">{post.likes.length}</span>
            </span>
            <span
              onClick={submitUnLike}
              className={classnames("unlike m cursor-pointer ", {
                "text-indigo-500": isUnLikedPost,
              })}
            >
              <FontAwesomeIcon icon={faThumbsDown} size="lg" className="mr-1" />
              <span className="font-medium">{post.unlikes.length}</span>
            </span>
          </div>
        </div>

        {/* comment input */}
        <CommentInput post={post} />

        {/* comments show */}
        {post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Post;
