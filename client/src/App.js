import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/generalCMPs/NotFound";
import Login from "./components/user/auth/login/Login";
import Email from "./components/user/auth/passReset/Email";
import Reset from "./components/user/auth/passReset/Reset";
import Register from "./components/user/auth/register/Register";
import Footer from "./components/user/layouts/footer/Footer";
import AdminFooter from "./components/admin/layouts/footer/Footer";
import Header from "./components/user/layouts/navbar/Header";
import AdminHeader from "./components/admin/layouts/navbar/Header";
import PrivateRoute from "./components/user/layouts/PrivateRoute";
import AdminPrivateRoute from "./components/admin/layouts/AdminPrivateRoute";
import Market from "./components/user/market/Market";
import Community from "./components/user/posts/Community";
import Profile from "./components/user/profile/Profile";
import ProfileEdit from "./components/user/profile/ProfileEdit";
import { logOut } from "./redux/actions/authActions";
import { setCurrentUser } from "./redux/reduxUtilis/setCurrentUser";
import store from "./redux/store";
import { addTokenToHeader } from "./utilis/addTokenToHeader";
import isEmpty from "./utilis/isEmpty";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Brands from "./components/admin/brands/Brands";
import SideBar from "./components/admin/layouts/sidebar/SideBar";
import Categories from "./components/admin/categories/Categories";
import Products from "./components/admin/products/Products";
import Add from "./components/admin/products/Add";
import Edit from "./components/admin/products/Edit";
import Members from "./components/admin/members/Members";
import Cart from "./components/user/cart/Cart";
import Show from "./components/admin/products/Show";
import ShowPr from "./components/user/market/show/Show";
import Checkout from "./components/user/cart/checkout/Checkout";
import Orders from "./components/user/orders/Orders";
import OrdersAdmin from "./components/admin/orders/Orders";
import ShowOrder from "./components/admin/orders/Show";
import Verify from "./components/user/auth/passReset/Verify";
import { useEffect } from "react";

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  store.dispatch(setCurrentUser(user));
  addTokenToHeader(token);
  if (Date.now() / 1000 > user.exp) {
    store.dispatch(logOut());
    window.location.replace("/login");
  }
}

const App = () => {
  const { user } = useSelector((state) => state.authReducer);

  const admin =
    (!isEmpty(user) && user.role === "admin") ||
    (!isEmpty(user) && user.role === "superAdmin");

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")) {
      localStorage.getItem("i18nextLng") === "ar"
        ? (document.body.dir = "rtl")
        : (document.body.dir = "ltr");
    }
  }, []);

  return (
    <div>
      {/*/////////////// site headers ///////////////////////////////*/}
      {admin && window.location.pathname.includes("admin") ? (
        <>
          <AdminHeader />
          <SideBar />
        </>
      ) : (
        <Header />
      )}

      <div className="app min-h-screen relative bg-slate-50">
        {/*/////////////// user routes ///////////////////////////////*/}
        <div className="user">
          <Routes>
            <Route path="/" element={<Market />} />
            <Route path="/:productId" element={<ShowPr />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email" element={<Email />} />
            <Route path="/reset-password/:token/:email" element={<Reset />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/verify" element={<Verify />} />

            <Route
              path="/community"
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profileEdit"
              element={
                <PrivateRoute>
                  <ProfileEdit />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminPrivateRoute>
                  <Dashboard />
                </AdminPrivateRoute>
              }
            />
            {/*  user routes  */}
            <Route
              path="/admin/users"
              element={
                <AdminPrivateRoute>
                  <Members />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/users/add"
              element={
                <AdminPrivateRoute>
                  <Members />
                </AdminPrivateRoute>
              }
            />
            {/*  category routes  */}
            <Route
              path="/admin/categories"
              element={
                <AdminPrivateRoute>
                  <Categories />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/categories/add"
              element={
                <AdminPrivateRoute>
                  <Categories />
                </AdminPrivateRoute>
              }
            />
            {/*  product routes  */}
            <Route
              path="/admin/products"
              element={
                <AdminPrivateRoute>
                  <Products />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <AdminPrivateRoute>
                  <Add />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/products/edit/:productId"
              element={
                <AdminPrivateRoute>
                  <Edit />
                </AdminPrivateRoute>
              }
            />

            <Route
              path="/admin/products/:productId"
              element={
                <AdminPrivateRoute>
                  <Show />
                </AdminPrivateRoute>
              }
            />
            {/*  brand routes  */}
            <Route
              path="/admin/brands"
              element={
                <AdminPrivateRoute>
                  <Brands />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminPrivateRoute>
                  <OrdersAdmin />
                </AdminPrivateRoute>
              }
            />

            <Route
              path="/admin/orders/:orderId"
              element={
                <AdminPrivateRoute>
                  <ShowOrder />
                </AdminPrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/*/////////////// not found ///////////////////////////////*/}
      </div>

      {/*/////////////// site footers ///////////////////////////////*/}
      {admin && window.location.pathname.includes("admin") ? (
        <AdminFooter />
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default App;
