import axios from "axios";
import { clearErrors } from "../reduxUtilis/clearErrors";
import {
  GET_ERRORS,
  EDIT_BRAND,
  DELETE_BRAND,
  ADD_BRAND,
  GET_BRANDS,
} from "./actionsTypes";

//---------------------------------------------|
//           ADD BRAND
//---------------------------------------------|
export const addBrand = (brandData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let brand = await axios.post("/api/brands", brandData);
    brand = await brand.data;
    dispatch({
      type: ADD_BRAND,
      payload: brand,
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
//           EDIT BRAND
//---------------------------------------------|
export const editBrand = (brandData, brandId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let brand = await axios.put("/api/brands/" + brandId, brandData);
    brand = await brand.data;
    dispatch({
      type: EDIT_BRAND,
      payload: { id: brandId, data: brand },
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
//           GET ALL BRANDS
//---------------------------------------------|
export const getBrands = () => async (dispatch) => {
  try {
    let brands = await axios.get("/api/brands");
    brands = await brands.data;

    dispatch({
      type: GET_BRANDS,
      payload: brands,
    });
  } catch (error) {
    dispatch({
      type: GET_BRANDS,
      payload: [],
    });
  }
};

//---------------------------------------------|
//           DELETE ALL BRANDS
//---------------------------------------------|
export const deleteBrand = (brandId) => async (dispatch) => {
  try {
    await axios.delete("/api/brands/" + brandId);
    dispatch({
      type: DELETE_BRAND,
      payload: brandId,
    });
    return true;
  } catch (err) {
    dispatch({
      type: DELETE_BRAND,
      payload: err.response.data,
    });
    return false;
  }
};
