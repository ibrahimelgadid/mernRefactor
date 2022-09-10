/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import Notifications from "../../notifications/Notifications";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../../../redux/actions/notificationsActions";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_client);

const Header = () => {
  const [showNot, setShowNot] = useState(false);
  const [notiClass, setnotiClass] = useState("scale-100");

  const getNotificationsHND = bindActionCreators(
    getNotifications,
    useDispatch()
  );

  const { notifications, loading } = useSelector(
    (state) => state.notificationsReducer
  );

  useEffect(() => {
    getNotificationsHND();
  }, []);

  if (socket) {
    socket.on("new notifications", () => {
      getNotificationsHND();
      setnotiClass("scale-150 bg-red-500");
      setTimeout(() => setnotiClass("scale-100 bg-red-500"), 500);
    });
  }

  return (
    <nav className="adminHeader">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="relative flex items-center justify-between h-16">
          <span
            className="me-5 cursor-pointer hover:text-sky-600 duration-300"
            onClick={(e) => {
              document.getElementById("sidebar").classList.contains("hidden")
                ? document.getElementById("sidebar").classList.remove("hidden")
                : document.getElementById("sidebar").classList.add("hidden");
            }}
          >
            <FontAwesomeIcon icon={faBars} size="xl" />
          </span>

          <div className=" sm:ms-6">
            <div className="flex space-x-4">
              <Link
                to="/admin"
                className="text-gray-700 hover:text-sky-600 duration-300   px-3 py-2 rounded-md text-sm font-bold"
                aria-current="page"
              >
                Home
              </Link>

              <a
                href="/"
                target={"_blank"}
                className="text-gray-700 hover:text-sky-600 duration-300   px-3 py-2 rounded-md text-sm font-bold"
              >
                To Store
              </a>
            </div>
          </div>
        </div>
        <div className=" inset-y-0 end-0 flex items-center  justify-center sm:static sm:inset-auto sm:ms-6 sm:pe-0">
          <button
            type="button"
            onClick={() => setShowNot(!showNot)}
            className="relative p-1 me-4 rounded-full  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-600 focus:ring-white"
          >
            <FontAwesomeIcon icon={faBell} size="xl" className="text-sky-600" />
            <div
              className={`${notiClass} transition-all duration-100 inline-flex absolute -top-2 -end-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-gray-600 rounded-full`}
            >
              {notifications.length || 0}
            </div>
          </button>
          {/* show notifications */}
          {showNot ? (
            <Notifications notifications={notifications} loading={loading} />
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
