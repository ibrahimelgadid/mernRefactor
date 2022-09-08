import axios from "axios";
import {
  GET_ERRORS,
  ADD_NOTIFY,
  GET_NOTIFIES,
  DELETE_NOTIFIY,
  DELETE_NOTIFIIES,
} from "./actionsTypes";

//---------------------------------------------------------|
//            ADDING NOTIFICATIONS FROM NOT AUTH
//---------------------------------------------------------|
export const addNotificationFromNotAuth =
  (notificationsData) => async (dispatch) => {
    try {
      let notification = await axios.post(
        "/notifications/notAuth",
        notificationsData
      );
      notification = notification.data;
      dispatch({
        type: ADD_NOTIFY,
        payload: notification,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
//---------------------------------------------------------|
//            ADDING NOTIFICATIONS FROM  AUTH
//---------------------------------------------------------|
export const addNotificationFromAuth =
  (notificationsData) => async (dispatch) => {
    try {
      let notification = await axios.post("/notifications", notificationsData);
      notification = notification.data;
      dispatch({
        type: ADD_NOTIFY,
        payload: notification,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

//---------------------------------------------------------|
//                    GET NOTIFICATIONS BY USER
//---------------------------------------------------------|
export const getNotifications = () => async (dispatch) => {
  try {
    let notifications = await axios.get("/notifications");
    notifications = await notifications.data;
    dispatch({
      type: GET_NOTIFIES,
      payload: notifications,
    });
  } catch (err) {
    dispatch({
      type: GET_NOTIFIES,
      payload: [],
    });
  }
};

//---------------------------------------------------------|
//                    DELETE NOTIFICATION
//---------------------------------------------------------|
export const deleteNotification = (notificationId) => async (dispatch) => {
  try {
    await axios.delete(`/notifications/${notificationId}`);
    dispatch({
      type: DELETE_NOTIFIY,
      payload: notificationId,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//---------------------------------------------------------|
//                    CLEAR NOTIFICATIONS
//---------------------------------------------------------|
export const clearNotifications = () => async (dispatch) => {
  try {
    await axios.post("/notifications/clear");
    dispatch({
      type: DELETE_NOTIFIIES,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
