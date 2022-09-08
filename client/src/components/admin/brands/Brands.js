import React, { useEffect, useState } from "react";
import Brand from "./Single";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../redux/actions/brandsActions";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import Add from "./Add";

const Brands = () => {
  const [showModal, setShowModal] = useState(false);
  const getBrandsForUi = bindActionCreators(getBrands, useDispatch());
  const { brands, loading } = useSelector((state) => state.brandsReducer);

  // get all brands from db
  useEffect(() => {
    getBrandsForUi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-10  container mx-auto">
      <h2 className="text-3xl font-medium text-center">Brands</h2>

      <Add showModal={showModal} setShowModal={setShowModal} />
      <div className="text-center my-5 ">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-600 py-1 px-2 text-white font-medium rounded-md"
        >
          Add Brand
        </button>
      </div>
      {
        // if still loading
        loading ? (
          <LoadingCMP siz={"w-12 h-12"} />
        ) : // if brands empty
        brands.length < 1 ? (
          <NoItemsCMP item={"brands"} />
        ) : (
          // show brands
          <div className="overflow-x-auto relative my-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    BRAND NAME{" "}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    DESCRIPTION
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
                {brands.map((brand, i) => (
                  <Brand
                    key={brand._id}
                    brand={brand}
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

export default Brands;
