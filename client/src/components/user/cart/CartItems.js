import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { confirmToDelete } from "../../../utilis/confirmToDelete";

import React, { useEffect, useState } from "react";
import {
  decreaseItemByOne,
  deleteItem,
  increaseItemByOne,
  changeCartValue,
} from "../../../redux/actions/cartActions";

const CartItems = ({ data, i }) => {
  const [qty, setqty] = useState(0);

  const deleteItemHND = bindActionCreators(deleteItem, useDispatch());
  const changeItemValueHND = bindActionCreators(changeCartValue, useDispatch());

  const increaseItemByOneHND = bindActionCreators(
    increaseItemByOne,
    useDispatch()
  );
  const decreaseItemByOneHND = bindActionCreators(
    decreaseItemByOne,
    useDispatch()
  );

  // function to increase item count by one
  const submitIncreaseItem = async () => {
    const itemData = {
      price: Number(data.price / data.qty),
      qty: 1,
      index: i,
    };

    await increaseItemByOneHND(itemData);
  };

  // function to decrease item count by one
  const submitDereaseItem = async () => {
    const itemData = {
      price: Number(data.price / data.qty),
      qty: 1,
      index: i,
    };

    await decreaseItemByOneHND(itemData);
  };

  // function to change item count by value
  const submitChangeItem = async () => {
    const itemData = {
      price: Number(data.price / data.qty),
      qty: Math.abs(Number(qty)),
      index: i,
    };

    await changeItemValueHND(itemData);
  };

  const itemData = {
    itemId: data._id,
    price: Number(data.price),
    qty: Number(data.qty),
    index: i,
  };

  useEffect(() => {
    setqty(data.qty);
  }, [data.qty]);

  return (
    <>
      <li className="flex py-6">
        {/* <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
            alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
            className="h-full w-full object-cover object-center"
          />
        </div> */}
        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to="/"> {data.name}</Link>
              </h3>
              <p className="ms-4">${data.price.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              ${(data.price / data.qty).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty {data.qty}</p>

            <div className="flex justify-between items-center">
              <div className="changeQTY me-5">
                <button
                  onClick={submitIncreaseItem}
                  className="font-medium bg-indigo-600 hover:bg-indigo-700 w-6 h-6 text-gray-100"
                >
                  +
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setqty(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? submitChangeItem() : null
                  }
                  className=" w-6 h-6 p-0 border-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={submitDereaseItem}
                  className="font-medium bg-indigo-600 hover:bg-indigo-700 w-6 h-6 text-gray-100"
                >
                  -
                </button>
              </div>
              <button
                type="button"
                onClick={() => confirmToDelete("Item", deleteItemHND, itemData)}
                className="font-medium bg-red-600 hover:bg-red-500 w-6 h-6 text-gray-100"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItems;
