import axios from "axios";
import {
  ADD_POSTS,
  DELETE_POST,
  EDIT_POST,
  GET_ERRORS,
  GET_POSTS,
} from "./actionsTypes";
import { clearErrors } from "../reduxUtilis/clearErrors";

//==================================================================
// get posts functionality                                         |
//==================================================================
export const getPosts = () => async (dispatch) => {
  try {
    let posts = await axios.get("/api/posts");
    posts = await posts.data;
    dispatch({
      type: GET_POSTS,
      payload: posts,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS,
      payload: [],
    });
  }
};

//==================================================================
// edit post functionality                                         |
//==================================================================
export const editPost = (postData, postId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let post = await axios.put(`/api/posts/${postId}`, postData);
    post = await post.data;
    dispatch({
      type: EDIT_POST,
      payload: { data: post, postId },
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};

//==================================================================
// add post functionality                                         |
//==================================================================
export const addPost = (postData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let posts = await axios.post("/api/posts", postData);
    posts = posts.data;
    dispatch({
      type: ADD_POSTS,
      payload: posts,
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};

//==================================================================
// delete post functionality                                         |
//==================================================================
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};

//==================================================================
// add like functionality                                         |
//==================================================================
export const likePost = (postId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let postAfterLike = await axios.post(`/api/likes/${postId}`);
    postAfterLike = await postAfterLike.data;
    dispatch({
      type: EDIT_POST,
      payload: { data: postAfterLike, postId },
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//==================================================================
// add unlike functionality                                         |
//==================================================================
export const unLikePost = (postId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let postAfterUnLike = await axios.delete(`/api/likes/${postId}`);
    postAfterUnLike = await postAfterUnLike.data;
    dispatch({
      type: EDIT_POST,
      payload: { data: postAfterUnLike, postId },
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//==================================================================
// add comment functionality                                         |
//==================================================================
export const addComment = (commentData, postId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let postAfterAddComment = await axios.post(
      `/api/comments/${postId}`,
      commentData
    );
    postAfterAddComment = postAfterAddComment.data;
    dispatch({
      type: EDIT_POST,
      payload: { data: postAfterAddComment, postId },
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};

//==================================================================
// delete comment functionality                                    |
//==================================================================
export const deleteComment = (postIdAndCommentId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let postAfterDeleteComment = await axios.delete(
      `/api/comments/${postIdAndCommentId}`
    );
    postAfterDeleteComment = await postAfterDeleteComment.data;

    dispatch({
      type: EDIT_POST,
      payload: {
        data: postAfterDeleteComment,
        postId: postIdAndCommentId.split("/")[0],
      },
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};
