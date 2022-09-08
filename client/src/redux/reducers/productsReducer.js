import {
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_FOR_USERS,
} from "../actions/actionsTypes";

let initialState = {
  products: [],
  product: {},
  loading: true,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FOR_USERS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default productsReducer;
