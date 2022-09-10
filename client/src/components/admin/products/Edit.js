import React, { useEffect, useRef, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import isEmpty from "../../../utilis/isEmpty";
import store from "../../../redux/store";
import { clearErrors } from "../../../redux/reduxUtilis/clearErrors";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import ErrorCMP from "../../generalCMPs/ErrorCMP";
import {
  editProduct,
  getProduct,
} from "../../../redux/actions/productsActions";
import { useNavigate, useParams } from "react-router-dom";
import { getBrands } from "../../../redux/actions/brandsActions";
import { getCategories } from "../../../redux/actions/categoriesActions";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [productImage, setProductImage] = useState("");

  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const { errors } = useSelector((state) => state.errorsReducer);

  const editProductHND = bindActionCreators(editProduct, useDispatch());
  const getProductForUi = bindActionCreators(getProduct, useDispatch());

  // get brands for select one for product
  const { brands } = useSelector((state) => state.brandsReducer);
  const getBrandsForUI = bindActionCreators(getBrands, useDispatch());
  // get categories for select one for product
  const { categories } = useSelector((state) => state.categoriesReducer);
  const getCategoriesForUI = bindActionCreators(getCategories, useDispatch());

  const { product } = useSelector((state) => state.productsReducer);

  const navigate = useNavigate();
  const imgRef = useRef();
  const { productId } = useParams();

  // send post data
  const submitProduct = async (e) => {
    setloadingstate(true);
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("brand", brand);
    productData.append("productImage", productImage);

    if (await editProductHND(productData, product._id)) {
      withReactContent(Swal).fire({
        title: "Done",
        icon: "success",
        text: "Product edited",
        timer: 3000,
      });
      navigate("/admin/products");
    }

    setloadingstate(false);
  };

  // get errors
  useEffect(() => {
    if (!isEmpty(errors)) {
      seterrorsstate(errors);
    }
  }, [errors, errorsstate]);

  // get errors
  useEffect(() => {
    if (!isEmpty(errors.productImage)) {
      setProductImage("");
      imgRef.current.src = product.productImage;
    }
    // eslint-disable-next-line
  }, [errors.productImage]);

  // get errors
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
    }
  }, [product]);

  // clear errors
  useEffect(() => {
    store.dispatch(clearErrors());
  }, []);

  // get brands and categories to select for product
  useEffect(() => {
    getBrandsForUI();
    getCategoriesForUI();
    getProductForUi(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-10">
      <h2 className="font-medium text-2xl text-center pb-5 text-sky-500">
        Edit {product.name}
      </h2>

      <img
        ref={imgRef}
        src={product.productImage}
        alt=""
        style={{ width: "50px", height: "50px" }}
      />
      <div className="relative z-0 mb-6 w-full group">
        <label
          className="sr-only block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
          id="file_input"
          type="file"
          onChange={(e) => {
            setProductImage(e.target.files[0]);
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
              // The file's text will be printed here
              imgRef.current.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 2mb).
        </p>
        <ErrorCMP errorData={errors.productImage} />
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          value={name}
          name="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
          placeholder=" "
          onChange={(e) => setName(e.target.value)}
        />
        <ErrorCMP errorData={errors.name} />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          name
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="number"
          value={price}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
          placeholder=" "
          onChange={(e) => setPrice(e.target.value)}
        />
        <ErrorCMP errorData={errors.price} />
        <label
          htmlFor="price"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          price
        </label>
      </div>

      <div className="grid sm:grid-cols-2 sm:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <label htmlFor="catId" className="sr-only">
            category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="catId"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value={""}>Select Category....</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <ErrorCMP errorData={errors.category} />
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <label htmlFor="branId" className="sr-only">
            brand
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            id="branId"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value={""}>Select Brand....</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>

          <ErrorCMP errorData={errors.brand} />
        </div>
      </div>

      <button
        type="submit"
        onClick={submitProduct}
        disabled={loadingstate}
        className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
      >
        {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Edit"}
      </button>
    </div>
  );
};

export default Edit;
