import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../../redux/actions/productsActions";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Sort = ({ t }) => {
  const [sort, setSort] = useState({
    selectedItem: "name",
    number: 1,
  });
  const [mount, setMount] = useState(false);

  const sortProductsHND = bindActionCreators(sortProducts, useDispatch());

  const submitSort = (e) => {
    setSort((prev) => ({
      selectedItem: e.target.id,
      number: prev.number * -1,
    }));
  };

  useEffect(() => {
    if (mount) {
      sortProductsHND(sort);
    } else {
      setMount(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <ul className="w-32 flex flex-col  divide-y">
      <li
        id="name"
        onClick={submitSort}
        className="font-medium text-gray-600 py-1 ps-3 hover:bg-gray-100 transition-colors duration-200  cursor-pointer"
      >
        <FontAwesomeIcon icon={faArrowUp} /> {t("Market.SORT_BY_NAME")}
      </li>

      <li
        id="price"
        onClick={submitSort}
        className="font-medium text-gray-600 py-1 ps-3 hover:bg-gray-100 transition-colors duration-200  cursor-pointer"
      >
        <FontAwesomeIcon icon={faArrowUp} /> {t("Market.SORT_BY_PRICE")}
      </li>

      <li
        id="createdAt"
        onClick={submitSort}
        className="font-medium text-gray-600 py-1 ps-3 hover:bg-gray-100 transition-colors duration-200  cursor-pointer"
      >
        <FontAwesomeIcon icon={faArrowUp} /> {t("Market.SORT_BY_ADDED")}
      </li>
    </ul>
  );
};

export default Sort;
