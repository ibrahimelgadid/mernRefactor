import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./actionsTypes";
import jwtDecode from "jwt-decode";
import { addTokenToHeader } from "../../utilis/addTokenToHeader";
import { setCurrentUser } from "../reduxUtilis/setCurrentUser";
import { clearErrors } from "../reduxUtilis/clearErrors";
import Cookie from "universal-cookie";
let cookie = new Cookie();

//---------------------------------------------|
//           POST REGISTER USER
//---------------------------------------------|
export const register = (registerData, navigate) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    await axios.post("/api/users/register", registerData);

    navigate("/login");
    return true;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
  return false;
};

//---------------------------------------------|
//           POST LOGIN USER
//---------------------------------------------|
export const login = (userData) => async (dispatch) => {
  try {
    let loginData = await axios.post("/api/users/login", userData);
    loginData = await loginData.data;
    localStorage.setItem("token", loginData.token);
    dispatch(setCurrentUser(jwtDecode(loginData.token)));
    addTokenToHeader(loginData);
    window.location.replace(process.env.REACT_APP_client);
    cookie.remove("userToken");
    return true;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
  return false;
};
//---------------------------------------------|
//            LOGIN OAUTH SUCCESS
//---------------------------------------------|
export const OauthLogin = () => async (dispatch) => {
  try {
    let loginData = await axios.get("/api/users/login/success");
    loginData = await loginData.data;
    localStorage.setItem("token", loginData.token);
    dispatch(setCurrentUser(jwtDecode(loginData.token)));
    addTokenToHeader(loginData);
    window.location.replace(process.env.REACT_APP_client);
    cookie.remove("userToken");
    localStorage.removeItem("provider");
    return true;
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    return false;
  }
};

//---------------------------------------------|
//           POST LOGOUT USER
//---------------------------------------------|
export const logOut = () => (dispatch) => {
  localStorage.removeItem("token");
  cookie.remove("userToken");
  addTokenToHeader(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};

//---------------------------------------------|
//           PUT EDIT PROFILE
//---------------------------------------------|
export const editProfile = (editProfileData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let token = await axios.put("/api/profile", editProfileData);
    token = await token.data.token;
    localStorage.setItem("token", token);
    addTokenToHeader(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: jwtDecode(token),
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
//           PUT EDIT PROFILE IMAGE
//---------------------------------------------|
export const changeImg = (imgData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let token = await axios.put("/apiprofile/image", imgData);
    token = await token.data.token;
    localStorage.setItem("token", token);
    addTokenToHeader(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: jwtDecode(token),
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
//           PUT EDIT PROFILE IMAGE
//---------------------------------------------|
export const sendMailToResetPass = (data) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    await axios.post("/api/users/reset-password-email", data);
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
//           RESET PASSWORD
//---------------------------------------------|
export const resetPass = (data, token, email) => async (dispatch) => {
  try {
    let user = await axios.post(
      `/api/users/reset-pass/${token}/${email}`,
      data
    );
    console.log(user.data);

    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return false;
  }
};
