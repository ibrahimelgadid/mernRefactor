import axios from "axios";
import { clearErrors } from "../reduxUtilis/clearErrors";

import {
  DELETE_ORDER,
  GET_ERRORS,
  GET_ORDER,
  GET_ORDERS,
} from "./actionsTypes";

//---------------------------------------------------------|
//                    GET ORDERS
//---------------------------------------------------------|
export const getOrders = () => async (dispatch) => {
  try {
    let orders = await axios.get("/orders");
    orders = await orders.data;
    dispatch({
      type: GET_ORDERS,
      payload: orders,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDERS,
      payload: [],
    });
  }
};

//---------------------------------------------------------|
//                    GET ORDERS FOR ADMINS
//---------------------------------------------------------|
export const getOrdersForAdmins = () => async (dispatch) => {
  try {
    let orders = await axios.get("/orders/admins");
    orders = await orders.data;
    dispatch({
      type: GET_ORDERS,
      payload: orders,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDERS,
      payload: [],
    });
  }
};

//---------------------------------------------------------|
//                    GET ORDER BY ID
//---------------------------------------------------------|
export const getOrder = (orderId) => async (dispatch) => {
  try {
    let order = await axios.get(`/orders/${orderId}`);
    order = await order.data;
    dispatch({
      type: GET_ORDER,
      payload: order,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER,
      payload: {},
    });
  }
};

//---------------------------------------------------------|
//                    VALIDATE ORDER
//---------------------------------------------------------|
export const validateOrder = (orderData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    await axios.post("/orders/validate", orderData);
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};

//---------------------------------------------------------|
//                    ADD NEW ORDER
//---------------------------------------------------------|
export const addOrder = (orderData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    await axios.post("/orders", orderData);
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};

//---------------------------------------------------------|
//                    EDIT ORDER
//---------------------------------------------------------|
export const editOrder = (orderData, orderId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let order = await axios.put(`/orders/${orderId}`, orderData);
    order = await order.data;
    dispatch({
      type: GET_ORDER,
      payload: order,
    });
    return true;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    return false;
  }
};

//---------------------------------------------------------|
//                    DELETE ORDERS
//---------------------------------------------------------|
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    await axios.post("/orders/delete", { orderId });
    dispatch({
      type: DELETE_ORDER,
      payload: orderId,
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
