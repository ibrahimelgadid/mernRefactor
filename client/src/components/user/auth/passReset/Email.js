import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import isEmpty from "../../../../utilis/isEmpty";
import store from "../../../../redux/store";
import { clearErrors } from "../../../../redux/reduxUtilis/clearErrors";
import { sendMailToResetPass } from "../../../../redux/actions/authActions";

import LoadingCMP from "../../../generalCMPs/LoadingCMP";

const Email = () => {
  const [email, setemail] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const sendMailToResetPassHND = bindActionCreators(
    sendMailToResetPass,
    useDispatch()
  );
  const { errors } = useSelector((state) => state.errorsReducer);
  const { isAuth } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setloadingstate(true);
    e.preventDefault();

    if (await sendMailToResetPassHND({ email })) {
      withReactContent(Swal).fire({
        title: "Email sent",
        icon: "success",
        text: "We have sent reset email, check your mail inbox",
        timer: 5000,
      });
      navigate("/verify");
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
            <div className="mt-6 text-center  font-medium text-gray-900">
              We send you reset link to reset your password.
            </div>
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm ">
              <div className="mb-2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <div className="error text-red-400 text-sm font-medium">
                  {errors.email ? (
                    <>
                      <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                      {errors.email}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loadingstate}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Email;
