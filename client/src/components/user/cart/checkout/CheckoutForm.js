import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingCMP from "../../../generalCMPs/LoadingCMP";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addOrder,
  validateOrder,
} from "../../../../redux/actions/ordersAction";

const CheckoutForm = ({ client_secret, shippingData }) => {
  const [loadingstate, setloadingstate] = useState(false);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // validate shipping inputs
  const validateShippingHND = bindActionCreators(validateOrder, useDispatch());
  const addOrderHND = bindActionCreators(addOrder, useDispatch());

  // Pass the appearance object to the Elements instance

  const handleSubmit = async (event) => {
    setloadingstate(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await stripe
      .confirmCardPayment(client_secret.CLIENT_SECRET, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
        },
      })
      .then(async (result) => {
        if (!(await validateShippingHND(shippingData))) {
          setloadingstate(false);
          return;
        } else {
          if (result.error) {
            withReactContent(Swal).fire({
              title: "Payment Error",
              icon: "error",
              text: result.error.message,
              timer: 3000,
            });
          } else {
            withReactContent(Swal).fire({
              title: "Payment Success",
              icon: "success",
              text:
                "you pay $" +
                result.paymentIntent.amount / 100 +
                " successfully",
              timer: 3000,
            });
            // TODO: ADD NEW ORDER AND DELETE CART
            await addOrderHND({
              ...shippingData,
              paymentId: result.paymentIntent.id,
            });
            navigate("/orders");
          }
        }
      })
      .catch((err) => {
        withReactContent(Swal).fire({
          title: "Payment Error",
          icon: "error",
          text: "something went wrong",
          timer: 3000,
        });
      });
    setloadingstate(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button
        className="bg-indigo-600 text-gray-50 absolute  sm:w-32 w-16 py-2 sm:text-xl text-sm font-medium top-20"
        type="submit"
        disabled={loadingstate}
      >
        {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Pay now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
