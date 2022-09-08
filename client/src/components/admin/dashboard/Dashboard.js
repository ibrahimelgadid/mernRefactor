import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getUsers } from "../../../redux/actions/membersActions";
import { getBrands } from "../../../redux/actions/brandsActions";
import { getCategories } from "../../../redux/actions/categoriesActions";
import { getProducts } from "../../../redux/actions/productsActions";
import SingeSection from "./SingeSection";
import { getOrdersForAdmins } from "../../../redux/actions/ordersAction";
import {
  faBaby,
  faBiking,
  faCreditCard,
  faFileAudio,
  faMask,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const {
    membersReducer,
    brandsReducer,
    categoriesReducer,
    productsReducer,
    ordersReducer,
  } = useSelector((state) => state);

  const getUsersHND = bindActionCreators(getUsers, useDispatch());
  const getProductsHND = bindActionCreators(getProducts, useDispatch());
  const getBrandsHND = bindActionCreators(getBrands, useDispatch());
  const getCategoriesHND = bindActionCreators(getCategories, useDispatch());

  const getOrdersForAdminsHND = bindActionCreators(
    getOrdersForAdmins,
    useDispatch()
  );

  useEffect(() => {
    getProductsHND();
    getUsersHND();
    getBrandsHND();
    getCategoriesHND();
    getOrdersForAdminsHND();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard container mx-auto px-3 sm:px-0">
      <h2 className="text-3xl font-medium text-center py-5">Dashboard</h2>
      <div className="sections grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
        <SingeSection
          icon={faBiking}
          name={"Products"}
          length={productsReducer.products.length}
          link={"products"}
        />

        <SingeSection
          icon={faFileAudio}
          name={"Brands"}
          length={brandsReducer.brands.length}
          link={"brands"}
        />

        <SingeSection
          icon={faCreditCard}
          name={"Categories"}
          length={categoriesReducer.categories.length}
          link={"categories"}
        />

        <SingeSection
          icon={faUsers}
          name={"Users"}
          length={membersReducer.users.length}
          link={"users"}
        />

        <SingeSection
          icon={faMask}
          name={"Orders"}
          length={ordersReducer.orders.length}
          link={"orders"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
