/* eslint-disable react-hooks/exhaustive-deps */
import Single from "./Single";

import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { clearNotifications } from "../../../redux/actions/notificationsActions";

const Notifications = ({ notifications, loading }) => {
  const clearNotificationsHND = bindActionCreators(
    clearNotifications,
    useDispatch()
  );
  return (
    <div className="shadow-xl absolute sm:top-16 smL:right-20 top-16 right-0 z-50  pt-5 max-w-xs bg-gray-50">
      <span
        onClick={() => clearNotificationsHND()}
        className="float-right font-medium text-red-400 mr-2 cursor-pointer hover:text-red-900 transition-all duration-300"
      >
        Clear
      </span>
      <h2 className=" text-lg font-medium text-gray-700 pb-2 px-4">
        Notifications{" "}
        <span className="text-sky-600 font-semibold border-2 border-sky-600 border-solid rounded-full ">
          {notifications.length || 0}
        </span>
      </h2>

      {loading ? (
        <LoadingCMP siz={"w-12 h-12"} />
      ) : // if orders empty
      notifications.length < 1 ? (
        <NoItemsCMP item={"notifications"} />
      ) : (
        notifications.map((notif, index) => (
          <Single key={index} notif={notif} />
        ))
      )}
    </div>
  );
};

export default Notifications;
