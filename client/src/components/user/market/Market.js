/* eslint-disable react-hooks/exhaustive-deps */
import Pagination from "./Pagination";
import Product from "./Product";
import TopIcons from "./TopIcons";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsBySearch,
  getProductsForUsers,
} from "../../../redux/actions/productsActions";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import isEmpty from "../../../utilis/isEmpty";
import { OauthLogin } from "../../../redux/actions/authActions";
import Cookie from "universal-cookie";
let cookie = new Cookie();

const Market = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    search: "",
  });
  const [searchWord, setSearchWord] = useState("");

  const getProductsHND = bindActionCreators(getProductsForUsers, useDispatch());
  const { products, loading } = useSelector((state) => state.productsReducer);

  const getProductsBySearchHND = bindActionCreators(
    getProductsBySearch,
    useDispatch()
  );
  const OauthLoginHND = bindActionCreators(OauthLogin, useDispatch());

  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");

  useEffect(() => {
    if (isEmpty(searchParam)) {
      getProductsHND(pageParam);
    }
  }, [pageParam]);

  // change searchParams when search word changed
  useEffect(() => {
    setSearchParams({
      page: 1,
      search: searchWord,
    });
    // eslint-disable-next-line
  }, [searchWord]);

  useEffect(() => {
    if (!isEmpty(searchWord)) {
      getProductsBySearchHND(searchParam, pageParam);
    }
    // eslint-disable-next-line
  }, [searchWord, searchParams]);

  useEffect(() => {
    if (cookie.get("userToken")) {
      OauthLoginHND();
    }
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <TopIcons searchWord={searchWord} setSearchWord={setSearchWord} />

        {
          // if still loading
          loading ? (
            <LoadingCMP siz={"w-12 h-12"} />
          ) : // if posts empty
          products.products?.length < 1 ? (
            <NoItemsCMP item={"posts"} />
          ) : (
            // show posts
            <div className="products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
              {products.products?.map((product, i) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )
        }

        <Pagination
          pageParam={pageParam}
          searchParam={searchParam}
          setSearchParams={setSearchParams}
          loading={loading}
          products={products}
        />
      </div>
    </div>
  );
};

export default Market;
