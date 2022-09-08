import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import isEmpty from "../../../utilis/isEmpty";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    selectedItem: items,
    loading,
  } = useSelector((state) => state.cartReducer);

  return (
    <div className=" container mx-auto py-10 sm:px-4 ">
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1 py-6 px-4 sm:px-6">
          <div className="text-center">
            <h2 className="sm:text-3xl text-xl font-bold text-gray-800 py-5">
              Shopping cart
            </h2>
          </div>
          {
            // if still loading
            loading ? (
              <LoadingCMP siz={"w-12 h-12"} />
            ) : // if Members empty
            items?.length < 1 || isEmpty(cart) ? (
              <NoItemsCMP item={"members"} />
            ) : (
              // show items
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((item, i) => (
                      <CartItems key={item._id} data={item} i={i} />
                    ))}
                  </ul>
                </div>
              </div>
            )
          }
        </div>

        {items?.length < 1 ? (
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${cart.totalPrice ?? 0}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 sm:py-3 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  to={"/"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
