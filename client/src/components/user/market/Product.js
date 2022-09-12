import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import { addItem } from "../../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Product = ({ product }) => {
  const { t, i18n } = useTranslation();
  const addItemsHND = bindActionCreators(addItem, useDispatch());

  const submitAddItem = async () => {
    const itemData = {
      itemId: product._id,
      price: product.price,
      name: product.name,
    };
    if (!localStorage.getItem("token")) {
      withReactContent(Swal).fire({
        title: "Fail",
        icon: "error",
        text: `Please sign in first`,
        timer: 3000,
      });
    } else {
      if (await addItemsHND(itemData)) {
        withReactContent(Swal).fire({
          title: "Added",
          icon: "success",
          text: `${product.name} added to cart successfully,`,
          timer: 3000,
        });
        // socket.emit("allah");
      }
    }
  };

  return (
    <div className="basis-1/3 bg-white rounded-sm shadow-md hover:-translate-y-5 duration-500">
      <img
        className="p-8 rounded-t-lg"
        src={product.productImage}
        alt={"product"}
      />

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors duration-500">
          <Link to={`/${product._id}`}>{product.name}</Link>
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />

          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800 ms-3">
            5.0
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>

          <button
            onClick={submitAddItem}
            className="text-indigo-700 dele hover:text-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-lg text-md "
          >
            <FontAwesomeIcon icon={faCartPlus} /> {t("Market.ADD_TO_CART")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
