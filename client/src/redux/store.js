import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postsReducer";
import errorsReducer from "./reducers/errorsReducer";
import brandsReducer from "./reducers/brandsReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import productsReducer from "./reducers/productsReducer";
import membersReducer from "./reducers/membersReducer";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/ordersReducer";
import notificationsReducer from "./reducers/notificationsReducer";

const reducers = combineReducers({
  authReducer,
  errorsReducer,
  postReducer,
  brandsReducer,
  categoriesReducer,
  productsReducer,
  membersReducer,
  cartReducer,
  ordersReducer,
  notificationsReducer,
});

const initialState = {};
const middleware = [thunk];

export const store = legacy_createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
