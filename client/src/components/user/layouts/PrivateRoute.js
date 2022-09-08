import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function PrivateRoute({ children }) {
  let { isAuth } = useSelector((state) => state.authReducer);
  var warning = false;
  useEffect(() => {
    if (warning) {
      withReactContent(Swal).fire({
        title: "Danger",
        icon: "error",
        text: "You are not authorized, Please login'",
        timer: 3000,
      });
    }
  });

  if (isAuth) {
    return children;
  } else {
    //eslint-disable-next-line
    return (warning = true), (<Navigate to="/login" />);
  }
}

export default PrivateRoute;
