import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../../../redux/actions/authActions";
import isEmpty from "../../../../utilis/isEmpty";
import store from "../../../../redux/store";
import { clearErrors } from "../../../../redux/reduxUtilis/clearErrors";
import LoadingCMP from "../../../generalCMPs/LoadingCMP";
import ErrorCMP from "../../../generalCMPs/ErrorCMP";
import { useTranslation } from "react-i18next";

// import Cookie from "universal-cookie";
// let cookie = new Cookie();

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);
  const [emailErr, setemailErr] = useState("");
  const { t, i18n } = useTranslation();

  const loginForUi = bindActionCreators(login, useDispatch());
  const { errors } = useSelector((state) => state.errorsReducer);
  const { isAuth } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setloadingstate(true);
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    if (await loginForUi(userData)) {
      withReactContent(Swal).fire({
        title: "Logged in",
        icon: "success",
        text: "You logged in successfully,",
        timer: 3000,
      });
    }

    setloadingstate(false);
  };

  // google oauth
  const google = () => {
    window.open(`${process.env.REACT_APP_server}/users/google`, "_self");
  };
  const handleSubmitGoogleOauth = (e) => {
    google();
    localStorage.setItem("provider", "google");
  };
  // facebook oauth
  const facebook = () => {
    window.open(`${process.env.REACT_APP_server}/users/facebook`, "_self");
  };
  const handleSubmitFacebookOauth = (e) => {
    facebook();
    localStorage.setItem("provider", "facebook");
  };

  // github oauth
  const github = () => {
    window.open(`${process.env.REACT_APP_server}/users/github`, "_self");
  };
  const handleSubmitGithubOauth = (e) => {
    github();
    localStorage.setItem("provider", "github");
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

  // clear errors
  useEffect(() => {
    if (localStorage.getItem("provider")) {
      setemailErr("This email is already exists");

      setTimeout(() => {
        localStorage.removeItem("provider");
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h2 className="mt-6 text-center text-lg sm:text-3xl font-extrabold text-gray-900">
              {t("Login.TITLE")}
            </h2>
            <p className="text-center sm:my-4 text-indigo-500 sm:font-medium ">
              <Link to={"/register"}> {t("Login.HAVE_ACOUNT")}</Link>
            </p>
            <ErrorCMP errorData={emailErr} />
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm ">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={t("Login.EMAIL")}
                />
                <ErrorCMP errorData={errors.email} />
              </div>

              <div className="mb-4 ">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={t("Login.PASSWORD")}
                />
                <ErrorCMP errorData={errors.password} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loadingstate}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="text-indigo-500 absolute start-0 inset-y-0 flex items-center ps-3">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                {loadingstate ? (
                  <LoadingCMP siz={"h-6 w-6"} />
                ) : (
                  t("Login.BUTTON")
                )}
              </button>
            </div>
          </form>

          <div className="divider text-center  text-gray-500">
            <span className="w-1/4 h-px inline-block bg-gray-500"></span>
            <span className="w-2/4 sm:text-base text-sm">
              {" "}
              {t("Login.CONTINUE")}{" "}
            </span>
            <span className="w-1/4 h-px inline-block bg-gray-500"></span>
          </div>

          <div className="social flex justify-evenly mx-5">
            <FontAwesomeIcon
              onClick={handleSubmitGoogleOauth}
              icon={faGoogle}
              className="cursor-pointer bg-white hover:text-red-600 hover:border-red-600 duration-500 text-gray-500 border border-1 border-gray-300 py-2 px-5 sm:px-9 md:px-11 rounded-md"
            />

            <FontAwesomeIcon
              onClick={handleSubmitFacebookOauth}
              icon={faFacebook}
              className="cursor-pointer bg-white hover:text-blue-600 hover:border-blue-600 duration-500 text-gray-500 border border-1 border-gray-300 py-2 px-5 sm:px-9 md:px-11 rounded-md"
            />
            <FontAwesomeIcon
              onClick={handleSubmitGithubOauth}
              icon={faGithub}
              className="cursor-pointer bg-white hover:text-gray-800 hover:border-text-gray-800 duration-500 text-gray-500 border border-1 border-gray-300 py-2 px-5 sm:px-9 md:px-11 rounded-md"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-evenly sm:py-6 text-sm sm:text-base">
            <div className="flex items-center">
              {t("Login.HAVE_ACOUNT2")}
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to={"/register"}
              >
                {" "}
                {t("Login.REGISTER")}
              </Link>
            </div>
            <div className="font-medium text-indigo-500">
              <Link to={"/email"}>{t("Login.FORGOT")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
