import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../redux/actions/ordersAction";
import Edit from "./Edit";
import { confirmToDelete } from "../../../utilis/confirmToDelete";
import { isOwner, isSuperAdmin } from "../../../utilis/actionsShow";
import { statusName } from "../../../utilis/orderStatus";
import { Link } from "react-router-dom";

const Single = ({ order, index }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteOrderForUi = bindActionCreators(deleteOrder, useDispatch());

  return (
    <>
      <Edit order={order} showModal={showModal} setShowModal={setShowModal} />
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index}
        </th>
        <td className="py-4 px-6">{order.fullname}</td>
        <td className="py-4 px-6">${order.cart.totalPrice} </td>
        <td className="py-4 px-6">${order.cart.totalQty} </td>
        <td className="py-4 px-6">{statusName[order.status]}</td>
        {isOwner(order.user?._id) || isSuperAdmin() ? (
          <td className="py-4 px-6 flex justify-between">
            <button
              onClick={() =>
                confirmToDelete("order", deleteOrderForUi, order._id)
              }
              className="text-red-600 font-medium"
            >
              Delete
            </button>
            <Link
              to={`/admin/orders/${order._id}`}
              onClick={() => setShowModal(true)}
              className="text-blue-600 font-medium"
            >
              Info
            </Link>
          </td>
        ) : null}
      </tr>
    </>
  );
};

export default Single;
