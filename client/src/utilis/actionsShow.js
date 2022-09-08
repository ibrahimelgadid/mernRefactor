import jwtDecode from "jwt-decode";
import isEmpty from "./isEmpty";

let user = !isEmpty(localStorage.token) ? jwtDecode(localStorage.token) : {};

export const isSuperAdmin = () => {
  return user.role === "superAdmin";
};

export const isAdmin = () => {
  return user.role === "admin";
};

export const isAdminOrSuperAdmin = () => {
  return user.role === "admin" || user.role === "superAdmin";
};

export const isOwner = (userOwener) => {
  return user._id === userOwener;
};
