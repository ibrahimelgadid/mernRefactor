import axios from "axios";
import { clearErrors } from "../reduxUtilis//clearErrors";

import {
  DELETE_PRODUCT,
  GET_ERRORS,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_FOR_USERS,
} from "./actionsTypes";

//---------------------------------------------|
//           ADD PRODUCT
//---------------------------------------------|
export const addProduct = (productData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    await axios.post("/products", productData);
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
//           EDIT PRODUCT
//---------------------------------------------|
export const editProduct = (productData, productId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    await axios.put("/products/" + productId, productData);
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
//           GET ALL PRODUCTS
//---------------------------------------------|
export const getProducts = () => async (dispatch) => {
  try {
    let products = await axios.get("/products");
    products = await products.data;

    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    });
    return true;
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS,
      payload: [],
    });
    return false;
  }
};

//---------------------------------------------|
//           GET ALL PRODUCTS FOR USERS
//---------------------------------------------|
export const getProductsForUsers = (page) => async (dispatch) => {
  try {
    let products = await axios.get(`/products/pro/forUsers?page=${page}`);
    products = await products.data;

    dispatch({
      type: GET_PRODUCTS_FOR_USERS,
      payload: products,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS,
      payload: [],
    });
  }
};

//---------------------------------------------|
//           SORT PRODUCTS
//---------------------------------------------|
export const sortProducts = (sortData) => async (dispatch) => {
  try {
    let products = await axios.post(`/products/pro/sort?page=1`, sortData);
    products = await products.data;
    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS,
      payload: [],
    });
  }
};

//---------------------------------------------|
//           GET ALL PRODUCTS BY FILTER
//---------------------------------------------|
export const getProductsByFilter = (filterData) => async (dispatch) => {
  try {
    let products = await axios.post("/products/pro/filter", filterData);
    products = await products.data;

    dispatch({
      type: GET_PRODUCTS_FOR_USERS,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS,
      payload: [],
    });
  }
};

//---------------------------------------------|
//           GET ALL PRODUCTS BY SEARCH
//---------------------------------------------|
export const getProductsBySearch = (search, page) => async (dispatch) => {
  try {
    let products = await axios.post(
      `/products/pro/search?search=${search}&page=${page}`
    );
    products = await products.data;

    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS,
      payload: [],
    });
  }
};

//---------------------------------------------|
//           GET PRODUCT
//---------------------------------------------|
export const getProduct = (productId) => async (dispatch) => {
  try {
    let product = await axios.get("/products/" + productId);
    product = product.data;
    dispatch({
      type: GET_PRODUCT,
      payload: product,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT,
      payload: {},
    });
  }
};

//---------------------------------------------|
//           DELETE PRODUCT
//---------------------------------------------|
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete("/products/" + productId);

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
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
//           ADD GALLARY IMAGE
//---------------------------------------------|
export const addGallaryImages =
  (gallaryData, productId) => async (dispatch) => {
    try {
      let product = await axios.post(
        `/products/gallary/${productId}`,
        gallaryData
      );
      product = await product;
      dispatch({
        type: GET_PRODUCT,
        payload: product,
      });
      return true;
    } catch (err) {
      dispatch({
        type: GET_PRODUCTS,
        payload: [],
      });
      return false;
    }
  };

//---------------------------------------------|
//           DELETE GALLARY IMAGE
//---------------------------------------------|
export const deleteGallaryImage = (productImgCloudId) => async (dispatch) => {
  try {
    let product = await axios.delete(`/products/gallary/${productImgCloudId}`);
    product = await product.data;
    dispatch({
      type: GET_PRODUCT,
      payload: product,
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS,
      payload: [],
    });
    return false;
  }
};
