import axios from "axios";
import { clearErrors } from "../reduxUtilis/clearErrors";
import {
  GET_ERRORS,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  GET_CATEGORIES,
} from "./actionsTypes";

//---------------------------------------------|
//           ADD CATEGORY
//---------------------------------------------|
export const addCategory = (categoryData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let category = await axios.post("/categories", categoryData);
    category = await category.data;
    dispatch({
      type: ADD_CATEGORY,
      payload: category,
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

//---------------------------------------------|
//           EDIT CATEGORY
//---------------------------------------------|
export const editCategory = (categoryData, categoryId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let category = await axios.put("/categories/" + categoryId, categoryData);
    category = await category.data;
    dispatch({
      type: EDIT_CATEGORY,
      payload: { id: categoryId, data: category },
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

//---------------------------------------------|
//           GET ALL CATEGORIES
//---------------------------------------------|
export const getCategories = () => async (dispatch) => {
  try {
    let categories = await axios.get("/categories");
    categories = await categories.data;

    dispatch({
      type: GET_CATEGORIES,
      payload: categories,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES,
      payload: [],
    });
  }
};

//---------------------------------------------|
//           DELETE ALL CATEGORIES
//---------------------------------------------|
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    await axios.delete("/categories/" + categoryId);
    dispatch({
      type: DELETE_CATEGORY,
      payload: categoryId,
    });
    return true;
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY,
      payload: err.response.data,
    });
    return false;
  }
};
