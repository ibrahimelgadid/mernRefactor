import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Moment from "react-moment";
import {
  statusClass,
  statusIcon,
  statusName,
} from "../../../utilis/orderStatus";
const Single = ({ order }) => {
  return (
    <div className=" flex flex-col justify-between max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-gray-100 rounded-t-lg w-full py-2 text-start ps-4 font-medium">
        <FontAwesomeIcon icon={faBars} />{" "}
        <Moment format="DD-MM-YY H:M" className="bg-white">
          {order.createdAt}
        </Moment>
      </div>
      <div className="p-4 font-medium flex flex-col justify-start">
        {order.cart.selectedItem.map((item, i) => (
          <div key={i}>
            <p className="text-lg">{item.name}</p>
            <p className="ps-5 text-gray-600">
              <span className="text-gray-800">Qty:</span> {item.qty}
              {` `}
              <span className="text-gray-800">Price: </span> ${item.price}
            </p>
          </div>
        ))}
      </div>
      <div
        className={`bg-gray-100 rounded-b-lg w-full py-2 text-center font-medium text-lg ${
          statusClass[order.status]
        }`}
      >
        <FontAwesomeIcon icon={statusIcon[order.status]} />{" "}
        {statusName[order.status]}{" "}
        <span className="text-gray-600">${order.cart.totalPrice}</span>
      </div>
    </div>
  );
};

export default Single;
