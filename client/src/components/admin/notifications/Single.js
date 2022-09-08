import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../../redux/actions/notificationsActions";

const Single = ({ notif }) => {
  const deleteNotificationHND = bindActionCreators(
    deleteNotification,
    useDispatch()
  );
  return (
    <div className="font-medium py-2 border-t cursor-pointer border-gray-300 px-4">
      <div className="flex">
        <div>
          {/* in case type register*/}
          {notif.type === "register"
            ? `new registration Email:-${notif.data.username || "deleted user"}`
            : // in case type brand
            notif.type === "brand"
            ? `${
                notif.from?.username || "deleted user"
              } add new brand  with name ${notif.data.name}`
            : // in case type category
            notif.type === "category"
            ? `${
                notif.from?.username || "deleted user"
              } add new category  with name ${notif.data.name}`
            : // in case type product
              `new product added with name ${notif.data.name} and price ${notif.data.price}`}{" "}
        </div>
        <span
          onClick={() => deleteNotificationHND(notif._id)}
          className="text-red-600 text-2xl font-medium cursor-pointer"
        >
          x
        </span>
      </div>
    </div>
  );
};

export default Single;
