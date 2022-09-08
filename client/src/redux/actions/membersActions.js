import axios from "axios";
import { clearErrors } from "../reduxUtilis/clearErrors";
import { DELETE_USER, EDIT_USER, GET_ERRORS, GET_USERS } from "./actionsTypes";

//========================================================|
//        GET USERS
//========================================================|
export const getUsers = () => async (dispatch) => {
  try {
    let users = await axios.get("/users");
    users = await users.data;

    dispatch({
      type: GET_USERS,
      payload: users,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS,
      payload: [],
    });
  }
};

//========================================================|
//        GET USER
//========================================================|
// export const getUser = (userId) => async(dispatch) => {
//   let user = awawiaxios
//     .get("users/" + userId)
//     .then((res) => {
//       dispatch({
//         type: GET_USER,
//         payload: res.data,
//       });
//     })

//     .catch((err) => {
//       dispatch({
//         type: GET_USER,
//         payload: {},
//       });
//     });
// };

//========================================================|
//        EDIT USER ROLE
//========================================================|
export const editUserRole = (roleData, userId) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let userAfterEditRole = await axios.put("/users/role/" + userId, roleData);
    userAfterEditRole = await userAfterEditRole.data;
    dispatch({
      type: EDIT_USER,
      payload: { userId: userId, data: userAfterEditRole },
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

//========================================================|
//        DELETE USER
//========================================================|
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete("/users/" + userId);
    dispatch({
      type: DELETE_USER,
      payload: userId,
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
