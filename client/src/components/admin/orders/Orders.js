import React, { useEffect, useState } from "react";
import Order from "./Single";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/actions/ordersAction";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const getOrdersForUi = bindActionCreators(getOrders, useDispatch());
  const { orders, loading } = useSelector((state) => state.ordersReducer);

  // get all orders from db
  useEffect(() => {
    getOrdersForUi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-10  container mx-auto">
      <h2 className="text-3xl font-medium text-center">Orders</h2>

      {
        // if still loading
        loading ? (
          <LoadingCMP siz={"w-12 h-12"} />
        ) : // if orders empty
        orders.length < 1 ? (
          <NoItemsCMP item={"orders"} />
        ) : (
          // show orders
          <div className="overflow-x-auto relative my-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Consumer{" "}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    QTY
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <Order
                    key={order._id}
                    order={order}
                    index={i + 1}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default Orders;
