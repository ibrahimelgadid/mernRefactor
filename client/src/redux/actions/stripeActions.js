import axios from "axios";
import { CLIENT_SECRET, GET_ERRORS } from "./actionsTypes";

//---------------------------------------------|
//           payment intent
//---------------------------------------------|
export const getPaymentClientSecret = (amount) => async (dispatch) => {
  try {
    let cilentSecret = await axios.post("/api/stripe/payment/create", amount);
    cilentSecret = await cilentSecret.data;

    dispatch({
      type: CLIENT_SECRET,
      payload: cilentSecret,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
