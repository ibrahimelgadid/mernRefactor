import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/categoriesActions";
import { getBrands } from "../../../redux/actions/brandsActions";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import PriceRange from "./PriceRange";
import { getProductsByFilter } from "../../../redux/actions/productsActions";

const FilterModal = ({ showModal, setShowModal, t }) => {
  const [price, setPrice] = useState([0, 400]);
  const [recordList, setRecordList] = useState([]);

  const [loadingstate, setloadingstate] = useState(false);

  // get categories for filter choosing
  const getCategoriesHND = bindActionCreators(getCategories, useDispatch());
  const { categories } = useSelector((state) => state.categoriesReducer);

  // get brands for filter choosing
  const getBrandsHND = bindActionCreators(getBrands, useDispatch());
  const { brands } = useSelector((state) => state.brandsReducer);

  // get products by filter
  const getProductsByFiltersHND = bindActionCreators(
    getProductsByFilter,
    useDispatch()
  );
  // const { products } = useSelector((state) => state.productsReducer);

  const addRecordToFilterArray = (record) => {
    const existRecord = recordList.indexOf(record);
    const newFilter = [...recordList];

    if (existRecord === -1) {
      newFilter.push(record);
    } else {
      newFilter.splice(existRecord, 1);
    }
    setRecordList(newFilter);
  };

  // send filter data
  const submitFilterData = async () => {
    setloadingstate(true);

    if (await getProductsByFiltersHND({ filters: recordList, price })) {
      setShowModal(false);
    }

    setloadingstate(false);
  };

  // get categories
  useEffect(() => {
    getCategoriesHND();
    getBrandsHND();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        size="xl"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body
          style={{
            overflow: "scroll",
          }}
        >
          <div className=" space-y-6 px-0 sm:px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("Market.FILTER")}
              <hr className="my-3 h-0.5 bg-gray-600" />
            </h3>

            <div className="sections grid grid-cols-3">
              <div className="category">
                <h3 className="text-3x font-bold pb-4">
                  {t("Market.CATEGORY")}
                </h3>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <div key={category._id}>
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        id={category.name}
                        value={category.name}
                        onChange={(e) => addRecordToFilterArray(category.name)}
                      />
                      <label className="cursor-pointer" htmlFor={category.name}>
                        {category.name}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="brand">
                <h3 className="text-3x font-bold pb-4">{t("Market.BRAND")}</h3>
                {brands.length > 0 &&
                  brands.map((brand) => (
                    <div key={brand._id}>
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        id={brand.name}
                        value={brand.name}
                        onChange={(e) => addRecordToFilterArray(brand.name)}
                      />
                      <label className="cursor-pointer" htmlFor={brand.name}>
                        {brand.name}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="priceRange">
                <h3 className="text-3x font-bold pb-4">{t("Market.PRICE")}</h3>
                <PriceRange price={price} setPrice={setPrice} />
                <strong className="float-left mt-2">${price[0]}</strong>
                <strong className="float-right mt-2">${price[1]}</strong>
              </div>
            </div>

            <div className="w-full">
              <button
                className="bg-indigo-700 py-2 px-3 text-white rounded-md"
                onClick={submitFilterData}
              >
                {loadingstate ? (
                  <LoadingCMP siz={"h-6 w-6"} />
                ) : (
                  t("Market.FILTER_BUTTON")
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterModal;
