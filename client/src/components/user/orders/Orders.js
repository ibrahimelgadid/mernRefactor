import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrders } from "../../../redux/actions/ordersAction";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import Single from "./Single";

const Orders = () => {
  const getOrdersHND = bindActionCreators(getOrders, useDispatch());

  const { orders, loading } = useSelector((state) => state.ordersReducer);

  useEffect(() => {
    getOrdersHND();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="orders container mx-auto sm:px-0 px-4">
      <h2 className="font-bold text-2xl py-8 text-center">My orders</h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-6">
        {
          // if still loading
          loading ? (
            <LoadingCMP siz={"w-12 h-12"} />
          ) : // if orders empty
          orders.length < 1 ? (
            <NoItemsCMP item={"orders"} />
          ) : (
            // show orders
            orders.map((order) => <Single key={order._id} order={order} />)
          )
        }
      </div>
    </div>
  );
};

export default Orders;
