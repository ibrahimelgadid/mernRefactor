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
import classnames from "classnames";
import { logOut } from "../../../../redux/actions/authActions";
import { getItems } from "../../../../redux/actions/cartActions";

const Header = () => {
  const [userDropDown, setuserDropDown] = useState(false);
  const [itemDropDown, setitemDropDown] = useState(false);

  const signOut = bindActionCreators(logOut, useDispatch());
  const geItemsHND = bindActionCreators(getItems, useDispatch());
  const { isAuth, user } = useSelector((state) => state.authReducer);

  const { cart } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (isAuth) {
      geItemsHND();
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {isAuth ? (
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => setitemDropDown(!itemDropDown)}
                className=" p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <FontAwesomeIcon icon={faBars} size={"xl"} />
              </button>
            </div>
          ) : null}
          <div
            className={classnames(
              "flex-1 flex items-center  sm:items-stretch sm:justify-start",
              { " justify-start": !isAuth, " justify-center": isAuth }
            )}
          >
            <div className="flex-shrink-0 flex items-center">
              <Link to={"/"}>
                <img
                  className="block h-8 w-auto"
                  src="../../../../../imgs/imm.png"
                  alt="Workflow"
                />
              </Link>
            </div>
            {isAuth ? (
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <NavLink
                    to="/cart"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium inline-flex relative items-center"
                    aria-current="page"
                  >
                    Cart
                    <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-indigo-700 rounded-full border-2 border-gray-800 ">
                      {cart?.totalQty || 0}
                    </div>
                  </NavLink>

                  <NavLink
                    to="/community"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Community
                  </NavLink>

                  <NavLink
                    to="/orders"
                    className="text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Orders
                  </NavLink>
                </div>
              </div>
            ) : null}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!isAuth ? (
              <div className="auth text-white flex">
                <Link
                  to="/register"
                  className="cursor-pointer text-gray-300 duration-500 bg-indigo-700 hover:bg-indigo-800 hover:text-white block sm:px-3 px-2  py-1 sm:text-base text-sm rounded-full sm:font-medium "
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="cursor-pointer  text-gray-300 duration-500 bg-indigo-700 hover:bg-indigo-800 hover:text-white block sm:px-3 px-2  ml-1 rtl:mr-1 py-1 sm:text-base text-sm  rounded-full  sm:font-medium "
                >
                  login
                </Link>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <FontAwesomeIcon icon={faBell} size="xl" />
                </button>
                <div
                  className="ml-3 relative"
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
                      className="z-50 origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        <FontAwesomeIcon icon={faUserGear} /> Profile
                      </Link>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800 duration-500"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        <FontAwesomeIcon icon={faGears} /> Settings
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
                          <FontAwesomeIcon icon={faUserNinja} /> Admin Area
                        </a>
                      ) : null}

                      <div
                        onClick={signOut}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800 duration-500"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                      </div>
                    </div>
                  ) : null}
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        {itemDropDown ? (
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/cart"
              className="bg-gray-900 relative text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Cart
              <div className="inline-flex absolute top-0 left-9 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-indigo-700 rounded-full border-2 border-gray-800 ">
                {cart?.totalQty || 0}
              </div>
            </Link>

            <Link
              to="/community"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Community
            </Link>

            <Link
              to="/orders"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Orders
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
