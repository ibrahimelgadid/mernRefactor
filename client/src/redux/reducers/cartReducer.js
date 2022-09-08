import {
  CLIENT_SECRET,
  GET_CART,
  PRODUCT_DELETE,
  PRODUCT_INC_DEC,
} from "../actions/actionsTypes";

let initialState = {
  cart: {},
  selectedItem: [],
  stripeSecret: "",
  loading: true,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        selectedItem: action.payload.selectedItem,
        loading: false,
      };

    case PRODUCT_INC_DEC:
      return {
        ...state,
        cart: action.payload.data,
        selectedItem: state.selectedItem.map((item, i) =>
          i === action.payload.index
            ? action.payload.data.selectedItem[action.payload.index]
            : item
        ),
      };

    case PRODUCT_DELETE:
      return {
        ...state,
        cart: action.payload.data,
        selectedItem: state.selectedItem.filter(
          (item, i) => i !== action.payload.index
        ),
      };

    case CLIENT_SECRET:
      return {
        ...state,
        stripeSecret: action.payload.clientSecret,
      };

    default:
      return state;
  }
};

export default cartReducer;
