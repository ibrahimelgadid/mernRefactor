import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AdminPrivateRoute({ children }) {
  const { isAuth, user } = useSelector((state) => state.authReducer);

  var warning = false;
  useEffect(() => {
    if (warning) {
      withReactContent(Swal).fire({
        title: "Not Admin",
        icon: "error",
        text: "You are not have admin privileges",
        timer: 3000,
      });
    }
  });

  if (isAuth && user.role !== "user") {
    return children;
  } else {
    // eslint-disable-next-line
    return (warning = true), (<Navigate to="/" />);
  }
}

export default AdminPrivateRoute;
