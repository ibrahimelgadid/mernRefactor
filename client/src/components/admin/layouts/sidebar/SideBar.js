import {
  faAngleDown,
  faBuildingFlag,
  faMarsStrokeRight,
  faSackDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./sidebar.css";

const SideBar = () => {
  const { user } = useSelector((state) => state.authReducer);

  // toggle between hidden classes
  const toggleHiddenClass = (e) => {
    if (e.currentTarget.nextElementSibling.classList.contains("hidden")) {
      e.currentTarget.nextElementSibling.classList.remove("hidden");
    } else {
      e.currentTarget.nextElementSibling.classList.add("hidden");
    }
  };

  return (
    <div
      onClick={(e) => e.currentTarget.classList.add("hidden")}
      className="z-50 absolute w-full h-full  group hidden"
      id="sidebar"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sidebar w-64 bg-sky-700  space-y-7 overflow-y-scroll h-full"
      >
        <div className="flex justify-around items-center pt-10">
          <img src={user.avatar} className="w-20 rounded-full" alt="" />
        </div>

        <ul>
          <li className="relative">
            <div
              onClick={toggleHiddenClass}
              className="cursor-pointer hover:bg-gray-700 w-full py-3 px-5 text-gray-100 font-medium  flex  justify-between items-center"
            >
              <span>
                <FontAwesomeIcon
                  icon={faUser}
                  className=" me-3 text-gray-400"
                  size="lg"
                />{" "}
                Users
              </span>
              <FontAwesomeIcon icon={faAngleDown} size="lg" />
            </div>
            <div className=" text-gray-300 hidden">
              <ul>
                <li className="hover:bg-sky-900 ">
                  <Link
                    className="block w-full py-3 ps-10 cursor-pointer font-medium"
                    to={"/admin/users"}
                  >
                    All Users
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="relative">
            <div
              onClick={toggleHiddenClass}
              className="cursor-pointer hover:bg-gray-700 w-full py-3 px-5 text-gray-100 font-medium  flex  justify-between items-center"
            >
              <span>
                <FontAwesomeIcon
                  icon={faBuildingFlag}
                  className=" me-2 text-gray-400"
                  size="lg"
                />{" "}
                Brands
              </span>
              <FontAwesomeIcon icon={faAngleDown} size="lg" />
            </div>
            <div className=" text-gray-300 hidden">
              <ul>
                <li className="hover:bg-sky-900 ">
                  <Link
                    className="block w-full py-3 ps-10 cursor-pointer font-medium"
                    to={"/admin/brands"}
                  >
                    All Brands
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="relative">
            <div
              onClick={toggleHiddenClass}
              className="cursor-pointer hover:bg-gray-700 w-full py-3 px-5 text-gray-100 font-medium  flex  justify-between items-center"
            >
              <span>
                <FontAwesomeIcon
                  icon={faMarsStrokeRight}
                  className=" me-2 text-gray-400"
                  size="lg"
                />{" "}
                Categories
              </span>
              <FontAwesomeIcon icon={faAngleDown} size="lg" />
            </div>
            <div className=" text-gray-300 hidden">
              <ul>
                <li className="hover:bg-sky-900 ">
                  <Link
                    className="block w-full py-3 ps-10 cursor-pointer font-medium"
                    to={"/admin/categories"}
                  >
                    All Categories
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="relative">
            <div
              onClick={toggleHiddenClass}
              className="cursor-pointer hover:bg-gray-700 w-full py-3 px-5 text-gray-100 font-medium  flex  justify-between items-center"
            >
              <span>
                <FontAwesomeIcon
                  icon={faSackDollar}
                  className=" me-3 text-gray-400"
                  size="lg"
                />{" "}
                Products
              </span>
              <FontAwesomeIcon icon={faAngleDown} size="lg" />
            </div>
            <div className=" text-gray-300 hidden">
              <ul>
                <li className="hover:bg-sky-900 ">
                  <Link
                    className="block w-full py-3 ps-10 cursor-pointer font-medium"
                    to={"/admin/products"}
                  >
                    All Products
                  </Link>
                </li>
                <li className="hover:bg-sky-900">
                  <Link
                    className=" block w-full py-3 ps-10 cursor-pointer font-medium"
                    to={"/admin/products/add"}
                  >
                    Add Product
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
