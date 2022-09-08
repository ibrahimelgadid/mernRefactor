import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/actions/ordersAction";
import Edit from "./Edit";
import { isOwner, isSuperAdmin } from "../../../utilis/actionsShow";
import { statusClass, statusName } from "../../../utilis/orderStatus";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCalendarAlt,
  faCartArrowDown,
  faEnvelope,
  faPhone,
  faStopwatch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import LoadingCMP from "../../generalCMPs/LoadingCMP";

const Show = () => {
  const [showModal, setShowModal] = useState(false);

  const { orderId } = useParams();
  const getOrderForUi = bindActionCreators(getOrder, useDispatch());
  const { order, loading } = useSelector((state) => state.ordersReducer);

  useEffect(() => {
    getOrderForUi(orderId);
    // eslint-disable-next-line
  }, [orderId]);

  return (
    <div className="order py-10 container mx-auto px-2 sm:px-0">
      <Edit order={order} showModal={showModal} setShowModal={setShowModal} />

      <div className="shadow-lg">
        <h2 className="text-center bg-gray-100 text-gray-700 text font-bold sm:text-2xl text-lg py-4">
          {order.fullname || "....."} order details
        </h2>

        {
          // if still loading
          loading ? (
            <LoadingCMP siz={"w-12 h-12"} />
          ) : (
            <div className="details flex flex-col justify-between items-start py-4">
              <div className="order-shipping ">
                <p className="sm:text-xl text-base font-bold text-gray-800 p-2">
                  <FontAwesomeIcon icon={faUser} /> Owner:-{" "}
                  <span className="text-gray-600 sm:text-lg text-base">
                    {order.orderOwner?.username || (
                      <del>
                        {order.deleted?.username} <small>deleted</small>
                      </del>
                    )}
                  </span>
                </p>
                <p className="sm:text-xl text-base font-bold text-gray-800 p-2">
                  <FontAwesomeIcon icon={faEnvelope} /> Email:-{" "}
                  <span className="text-gray-600 sm:text-lg text-base">
                    {order.email}
                  </span>
                </p>
                <p className="sm:text-xl text-base font-bold text-gray-800 p-2">
                  <FontAwesomeIcon icon={faPhone} /> Phone:-
                  <span className="text-gray-600 sm:text-lg text-base">
                    {order.phone}
                  </span>
                </p>
                <p className="sm:text-xl text-base font-bold text-gray-800 p-2">
                  <FontAwesomeIcon icon={faAddressBook} /> Address:-
                  <span className="text-gray-600 sm:text-lg text-base">
                    {order.address}
                  </span>
                </p>
                <p className="sm:text-xl text-base font-bold text-gray-800 p-2">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Created at:-{" "}
                  <span className="text-gray-600 sm:text-lg text-base">
                    <Moment format="YY-MM-DD H:M">{order.createdAt}</Moment>
                  </span>
                </p>
                <p className="sm:text-xl text-base font-bold text-gray-800 p-2">
                  <FontAwesomeIcon icon={faStopwatch} /> Status:-{" "}
                  <span
                    onClick={() => setShowModal(true)}
                    className={`${statusClass[order.status]} cursor-pointer`}
                  >
                    {statusName[order.status]}
                  </span>
                </p>
              </div>

              <div className="order-cart shadow-lg  pt-4 float-right">
                <div className="bg-gray-100 font-bold flex justify-between sm:text-lg text-sm p-2">
                  <div>
                    <FontAwesomeIcon icon={faCartArrowDown} /> Cart:-{" "}
                    {order.cart?.totalQty}
                  </div>
                  <div>Total:- ${order.cart?.totalPrice}</div>
                </div>
                <ul>
                  {order.cart?.selectedItem.map((item) => (
                    <li
                      className="font-bold px-2 sm:text-lg text-sm"
                      key={item._id}
                    >
                      {item.name}
                      <div className="px-4 pb-2 text-gray-500 sm:text-lg text-sm">
                        {" "}
                        {item.qty} items of {item.name} cost ${item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Show;
