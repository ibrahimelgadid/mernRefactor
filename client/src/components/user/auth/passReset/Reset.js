import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import isEmpty from "../../../../utilis/isEmpty";
import store from "../../../../redux/store";
import { clearErrors } from "../../../../redux/reduxUtilis/clearErrors";
import LoadingCMP from "../../../generalCMPs/LoadingCMP";
import { resetPass } from "../../../../redux/actions/authActions";
import { useNavigate, useParams } from "react-router-dom";
import ErrorCMP from "../../../generalCMPs/ErrorCMP";

const Reset = () => {
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const resetPassHND = bindActionCreators(resetPass, useDispatch());
  const { errors } = useSelector((state) => state.errorsReducer);
  const { isAuth } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const { email, token } = useParams();

  const handleSubmit = async (e) => {
    setloadingstate(true);
    e.preventDefault();
    const userData = {
      password,
      password2,
    };

    if (await resetPassHND(userData, token, email)) {
      withReactContent(Swal).fire({
        title: "Password Edit",
        icon: "success",
        text: "You password changed successfully,",
        timer: 2000,
      });
      navigate("/login");
    }

    setloadingstate(false);
  };

  // get errors
  useEffect(() => {
    if (!isEmpty(errors)) {
      seterrorsstate(errors);
    }
  }, [errors, errorsstate]);

  // clear errors
  useEffect(() => {
    store.dispatch(clearErrors());
  }, []);

  // redirect if authenticated
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="register">
      <div className=" min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4 ">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="../../../../../imgs/imm.png"
              alt="Workflow"
            />
            <p className="mt-6 text-center font-medium text-gray-900">
              You can change your password now.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm ">
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  password
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter password"
                />
                <ErrorCMP errorData={errors.password} />
              </div>

              <div className="mb-4 ">
                <label htmlFor="password2" className="sr-only">
                  Password
                </label>
                <input
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setpassword2(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Re-enter password"
                />
                <ErrorCMP errorData={errors.password2} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loadingstate}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Reset"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
