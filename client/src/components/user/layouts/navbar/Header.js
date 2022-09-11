import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faGears,
  faSignOutAlt,
  faUserGear,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../../../../redux/actions/authActions";
import { getItems } from "../../../../redux/actions/cartActions";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [userDropDown, setuserDropDown] = useState(false);
  const [itemDropDown, setitemDropDown] = useState(false);
  const { t, i18n } = useTranslation();

  const signOut = bindActionCreators(logOut, useDispatch());
  const getItemsHND = bindActionCreators(getItems, useDispatch());
  const { isAuth, user } = useSelector((state) => state.authReducer);

  const { cart } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (isAuth) {
      getItemsHND();
    }
    // eslint-disable-next-line
  }, []);

  // hide dropdown when not focus
  useEffect(() => {
    document.body.addEventListener("click", () => {
      setuserDropDown(false);
    });
  }, [itemDropDown]);

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto container ">
        <div className="relative flex items-center justify-between h-16">
          {/* ////////////////////////  brand & lang section  /////// */}

          <div className="flex">
            <Link to={"/"}>
              <img
                className="block h-8 w-auto"
                src="../../../../../imgs/imm.png"
                alt=""
              />
            </Link>

            <div className="text-gray-100 font-medium border border-indigo-600 rounded-full flex justify-center items-center px-2 ">
              {i18n.language === "ar" && (
                <button
                  onClick={() => {
                    i18n.changeLanguage("en");
                    document.body.dir = "ltr";
                  }}
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  EN
                </button>
              )}

              {i18n.language === "en" && (
                <button
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    document.body.dir = "rtl";
                  }}
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  AR
                </button>
              )}
            </div>
          </div>
          {isAuth ? (
            <>
              {/* ////////////////////////  items bar section  /////// */}
              <div className=" flex items-center sm:hidden order-2">
                <button
                  onClick={() => setitemDropDown(!itemDropDown)}
                  className=" p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <FontAwesomeIcon icon={faBars} size={"xl"} />
                </button>
              </div>

              {/* ////////////////////////  user section  /////// */}
              <div className="flex order-1">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <FontAwesomeIcon icon={faBell} size="xl" />
                </button>
                <div
                  className="ms-3 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <button
                      onClick={() => setuserDropDown(!userDropDown)}
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                    </button>
                  </div>
                  {userDropDown ? (
                    <div
                      className="z-50  absolute end-0  mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <div className="text-center my-2 text-xl text-indigo-600 font-medium">
                        {" "}
                        {user.username}
                      </div>
                      <hr />
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800 duration-500"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        <FontAwesomeIcon icon={faUserGear} />{" "}
                        {t("Header.PROFILE")}
                      </Link>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800 duration-500"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        <FontAwesomeIcon icon={faGears} />{" "}
                        {t("Header.SETTINGS")}
                      </a>
                      {user.role === "admin" || user.role === "superAdmin" ? (
                        <a
                          href="/admin"
                          target={"_blank"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800 duration-500"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                        >
                          <FontAwesomeIcon icon={faUserNinja} />{" "}
                          {t("Header.ADMIN_AREA")}
                        </a>
                      ) : null}

                      <div
                        onClick={signOut}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800 duration-500"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} />{" "}
                        {t("Header.LOGOUT")}
                      </div>
                    </div>
                  ) : null}
                </div>{" "}
              </div>

              {/* /////////////// cart items withot dropdown ///// */}
              <div className="hidden sm:block ms-6 ">
                <div className="flex space-x-4">
                  <NavLink
                    to="/cart"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium inline-flex relative items-center"
                    aria-current="page"
                  >
                    {t("Header.CART")}
                    <div className="inline-flex absolute -top-2 start-9 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-indigo-700 rounded-full border-2 border-gray-800 ">
                      {cart?.totalQty || 0}
                    </div>
                  </NavLink>

                  <NavLink
                    to="/community"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t("Header.COMMUNITY")}
                  </NavLink>

                  <NavLink
                    to="/orders"
                    className="text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t("Header.ORDERS")}
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <div className="auth text-white flex">
              <Link
                to="/register"
                className="cursor-pointer text-gray-300 duration-500 bg-indigo-700 hover:bg-indigo-800 hover:text-white block sm:px-3 px-2  py-1 sm:text-base text-sm rounded-full sm:font-medium "
              >
                {t("Header.REGISTER")}
              </Link>
              <Link
                to="/login"
                className="cursor-pointer  text-gray-300 duration-500 bg-indigo-700 hover:bg-indigo-800 hover:text-white block sm:px-3 px-2  me-1 py-1 sm:text-base text-sm  rounded-full  sm:font-medium "
              >
                {t("Header.LOGIN")}
              </Link>
            </div>
          )}
        </div>

        {/* items dropdown */}
        <div className="sm:hidden" id="mobile-menu">
          {itemDropDown ? (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/cart"
                className="bg-gray-900 relative text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                {t("Header.CART")}
                <div className="inline-flex absolute top-0 start-9 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-indigo-700 rounded-full border-2 border-gray-800 ">
                  {cart?.totalQty || 0}
                </div>
              </Link>

              <Link
                to="/community"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {t("Header.COMMUNITY")}
              </Link>

              <Link
                to="/orders"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {t("Header.ORDERS")}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Header;
