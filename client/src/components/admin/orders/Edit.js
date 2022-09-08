import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import { editOrder } from "../../../redux/actions/ordersAction";
import { statusName, statusArr } from "../../../utilis/orderStatus";

const Edit = ({ showModal, setShowModal, order }) => {
  const [status, setStatus] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const editOrderHND = bindActionCreators(editOrder, useDispatch());

  // send post data
  const submitOrder = async () => {
    setloadingstate(true);

    if (await editOrderHND({ status }, order._id)) {
      withReactContent(Swal).fire({
        title: "Done",
        icon: "success",
        text: "Order edited successfully",
        timer: 3000,
      });
      setShowModal(false);
    }
    setloadingstate(false);
  };

  // fill text value with post text
  useEffect(() => {
    setStatus(order.status);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-0 sm:px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Edit order status
            </h3>

            <div className="relative z-0 mb-6 w-full group">
              <label htmlFor="orderId" className="sr-only">
                Order
              </label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={status}
                id="orderId"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none "
              >
                {statusArr.map((s) => (
                  <option value={s} key={s}>
                    {statusName[s]}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <button
                className="bg-indigo-700 py-2 px-3 text-white rounded-md"
                onClick={submitOrder}
                disabled={loadingstate}
              >
                {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Edit"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;
