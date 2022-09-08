import React, { useEffect, useState } from "react";
import Category from "./Single";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/categoriesActions";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import Add from "./Add";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const getCategoriesForUi = bindActionCreators(getCategories, useDispatch());
  const { categories, loading } = useSelector(
    (state) => state.categoriesReducer
  );

  // get all categories from db
  useEffect(() => {
    getCategoriesForUi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-10  container mx-auto">
      <h2 className="text-3xl font-medium text-center">Categories</h2>

      <Add showModal={showModal} setShowModal={setShowModal} />
      <div className="text-center my-5 ">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-600 py-1 px-2 text-white font-medium rounded-md"
        >
          Add Category
        </button>
      </div>
      {
        // if still loading
        loading ? (
          <LoadingCMP siz={"w-12 h-12"} />
        ) : // if categories empty
        categories.length < 1 ? (
          <NoItemsCMP item={"categories"} />
        ) : (
          // show categories
          <div className="overflow-x-auto relative my-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CATEGORY NAME{" "}
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
                {categories.map((category, i) => (
                  <Category
                    key={category._id}
                    category={category}
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

export default Categories;
