import axios from "axios";
import {
  GET_CART,
  GET_ERRORS,
  PRODUCT_INC_DEC,
  PRODUCT_DELETE,
} from "./actionsTypes";
import { clearErrors } from "../reduxUtilis/clearErrors";

//---------------------------------------------------|
//       POST CART ITEM
//---------------------------------------------------|
export const addItem = (itemData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let items = await axios.post("/cart", itemData);
    items = await items.data;
    dispatch({
      type: GET_CART,
      payload: items,
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

//---------------------------------------------------|
//       INCREASE CART ITEM BY ONE
//---------------------------------------------------|
export const increaseItemByOne = (itemData) => async (dispatch) => {
  try {
    let item = await axios.post("/cart/increase", itemData);
    item = await item.data;
    dispatch({
      type: PRODUCT_INC_DEC,
      payload: { data: item, index: itemData.index },
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//---------------------------------------------------|
//       DECREASE CART ITEM BY ONE
//---------------------------------------------------|
export const decreaseItemByOne = (itemData) => async (dispatch) => {
  try {
    let item = await axios.post("/cart/decrease", itemData);
    item = await item.data;
    dispatch({
      type: PRODUCT_INC_DEC,
      payload: { data: item, index: itemData.index },
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//---------------------------------------------------|
//       DECREASE CART ITEM BY ONE
//---------------------------------------------------|
export const changeCartValue = (itemData) => async (dispatch) => {
  try {
    let item = await axios.post("/cart/value", itemData);
    item = await item.data;
    dispatch({
      type: PRODUCT_INC_DEC,
      payload: { data: item, index: itemData.index },
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//---------------------------------------------------|
//       GET CART ITEMS
//---------------------------------------------------|
export const getItems = () => async (dispatch) => {
  try {
    let items = await axios.get("/cart");
    items = await items.data;
    dispatch({
      type: GET_CART,
      payload: items,
    });
  } catch (error) {
    dispatch({
      type: GET_CART,
      payload: [],
    });
  }
};

//---------------------------------------------------|
//       DELETE CART ITEM
//---------------------------------------------------|
export const deleteItem = (itemData) => async (dispatch) => {
  try {
    let cart = await axios.post("/cart/delete", itemData);
    cart = await cart.data;
    dispatch({
      type: PRODUCT_DELETE,
      payload: { data: cart, index: itemData.index },
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//---------------------------------------------------|
//       CLEAR CART ITEMS
//---------------------------------------------------|
export const clearCart = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/cart/clear")
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: [],
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
