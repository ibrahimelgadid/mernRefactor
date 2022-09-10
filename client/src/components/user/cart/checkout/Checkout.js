/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentClientSecret } from "../../../../redux/actions/stripeActions";
import isEmpty from "../../../../utilis/isEmpty";

import ErrorCMP from "../../../generalCMPs/ErrorCMP";

const stripePromise = loadStripe(process.env.REACT_APP_public_stripe_key);

const Checkout = () => {
  const [shipping, setshipping] = useState({
    fullname: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errorsstate, seterrorsstate] = useState("");
  const { errors } = useSelector((state) => state.errorsReducer);

  const { cart, stripeSecret } = useSelector((state) => state.cartReducer);

  const getPaymentClientSecretHND = bindActionCreators(
    getPaymentClientSecret,
    useDispatch()
  );

  const changeInputsValue = (e) => {
    setshipping((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!isEmpty(cart)) {
      getPaymentClientSecretHND({
        amount: cart.totalPrice,
      });
    }
  }, [cart]);

  // get errors
  useEffect(() => {
    if (!isEmpty(errors)) {
      seterrorsstate(errors);
    }
  }, [errors, errorsstate]);

  return (
    <div className="container mx-auto sm:px-0 px-4">
      <h2 className="font-medium sm:text-3xl text-xl text-center py-5 text-indigo-500">
        Shipping Details
      </h2>
      <div className="relative z-0 mb-0 sm:mb-5 w-full group">
        <input
          type="text"
          name="fullname"
          className="block sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
          onChange={changeInputsValue}
        />
        <ErrorCMP errorData={errors.fullname} />
        <label
          htmlFor="fullname"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          fullName
        </label>
      </div>
      <div className="relative z-0 mb-0 sm:mb-5 w-full group">
        <input
          type="email"
          name="email"
          className="block sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
          onChange={changeInputsValue}
        />
        <ErrorCMP errorData={errors.email} />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="grid sm:grid-cols-2 sm:gap-6">
        <div className="relative z-0 mb-0 sm:mb-5 w-full group">
          <input
            type="text"
            name="address"
            className="block sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            onChange={changeInputsValue}
          />
          <ErrorCMP errorData={errors.address} />
          <label
            htmlFor="address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>
        <div className="relative z-0 mb-0 sm:mb-5 w-full group">
          <input
            type="text"
            name="phone"
            className="block sm:py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            onChange={changeInputsValue}
          />
          <ErrorCMP errorData={errors.phone} />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
      </div>
      <p>4242424242424242</p>
      <div className="border py-4 rounded-md relative">
        <Elements
          stripe={stripePromise}
          options={{
            CLIENT_SECRET: stripeSecret,
            appearance: { theme: "night" },
          }}
        >
          <CheckoutForm
            client_secret={{ CLIENT_SECRET: stripeSecret }}
            shippingData={{ ...shipping }}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
