import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions/productsActions";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import { Link } from "react-router-dom";
import Single from "./Single";

const Products = () => {
  const getProductsForUi = bindActionCreators(getProducts, useDispatch());
  const { products, loading } = useSelector((state) => state.productsReducer);

  // get all products from db
  useEffect(() => {
    getProductsForUi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-10  container mx-auto">
      <h2 className="text-3xl font-medium text-center">Products</h2>

      <div className="text-center my-5 ">
        <Link
          to={"/admin/products/add"}
          className="bg-gray-600 py-1 px-2 text-white font-medium rounded-md"
        >
          Add Products
        </Link>
      </div>
      {
        // if still loading
        loading ? (
          <LoadingCMP siz={"w-12 h-12"} />
        ) : // if products empty
        products.length < 1 ? (
          <NoItemsCMP item={"products"} />
        ) : (
          // show products
          <div className="overflow-x-auto relative my-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    PRODUCT NAME{" "}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    PRICE
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Thumbnail
                  </th>
                  <th scope="col" className="py-3 px-6">
                    PUBLISHER
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <Single key={product._id} product={product} index={i + 1} />
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default Products;
