import {
  faCartArrowDown,
  faImage,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { getProduct } from "../../../../redux/actions/productsActions";
import { addItem } from "../../../../redux/actions/cartActions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Fancybox from "../gallary/fancybox/Fancybox";

const Show = () => {
  const { productId } = useParams();
  const getProductForUi = bindActionCreators(getProduct, useDispatch());

  const { product } = useSelector((state) => state.productsReducer);

  const addItemsHND = bindActionCreators(addItem, useDispatch());

  const submitAddItem = async () => {
    const itemData = {
      itemId: product._id,
      price: product.price,
      name: product.name,
    };
    if (await addItemsHND(itemData)) {
      withReactContent(Swal).fire({
        title: "Added",
        icon: "success",
        text: `${product.name} added to cart successfully,`,
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    getProductForUi(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
      <div className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl">
        <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
            <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
              <img
                src={product.productImage}
                alt=""
                className="object-center object-cover"
              />
            </div>
            <div className="sm:col-span-8 lg:col-span-7">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                {product.name}
              </h2>

              <section aria-labelledby="information-heading" className="mt-2">
                <h3 id="information-heading" className="sr-only">
                  Product information
                </h3>

                <p className="text-2xl text-gray-900">${product.price}</p>

                <div className="mt-6">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                    </div>
                    <p className="sr-only">3.9 out of 5 stars</p>
                    <Link
                      to="#"
                      className="ml-3 text-sm font-medium text-sky-600 hover:text-sky-500"
                    >
                      117 reviews
                    </Link>
                  </div>
                </div>
              </section>

              <section
                aria-labelledby="options-heading"
                className="mt-10 text-center"
              >
                <h4 className="text-2xl font-semibold  py-8">
                  {" "}
                  <FontAwesomeIcon icon={faImage} /> Gallary:-
                </h4>
                {product.productGallary ? (
                  <Fancybox>
                    {product.productGallary.length > 0 && (
                      <div className="flex justify-center ">
                        {product.productGallary.map((img) => (
                          <span
                            key={img.img}
                            data-fancybox="images"
                            data-src={img.img}
                          >
                            <img
                              alt=""
                              className="w-12 border border-solid border-gray-600 mr-2 rounded-full mx-auto"
                              src={img.img}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </Fancybox>
                ) : (
                  <div className="pb-5 font-medium text-red-500">
                    There is no gallary items
                  </div>
                )}

                <button
                  onClick={submitAddItem}
                  className="bg-indigo-700 mt-5 text-indigo-100 py-2 px-4 rounded-md font-medium"
                >
                  <FontAwesomeIcon icon={faCartArrowDown} /> Add to cart
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
