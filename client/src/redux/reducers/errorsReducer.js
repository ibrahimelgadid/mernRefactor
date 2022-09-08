import { CLEAR_ERRORS, GET_ERRORS } from "../actions/actionsTypes";

const initialState = {
  errors: [],
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, errors: action.payload };

    case CLEAR_ERRORS:
      return { ...state, errors: [] };

    default:
      return state;
  }
};

export default errorReducer;
