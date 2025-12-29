import Toolbar from "../../components/Toolbar";
import React, { useState, useEffect, Suspense, useContext } from "react";
import css from "./style.module.css";
import Sidebar from "../../components/Sidebar";
import OrderPage from "../OrderPage";
import { Outlet, Route, Routes } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import ContactInfo from "../../components/ContactInfo";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import ProtectedRoute from "../../components/ProtectedRoute";
import { BurgerStore } from "../../context/BurgerContext";
import { OrderStore } from "../../context/OrderContext";
import UserContext from "../../context/UserContext";
const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});

const App = (props) => {
  const userCtx = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        userCtx.loginUserSuccess(token, userId, expireDate, refreshToken);
        userCtx.autoRenewUser(expireDate.getTime() - new Date().getTime());
      } else {
        userCtx.logoutUser();
      }
    }
  }, []);
  return (
    <div>
      <Toolbar toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <main className={css.Content}>
        <Suspense fallback={<div>Түр хүлээнэ үү... Анударь аа</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route
                element={
                  <BurgerStore>
                    <Outlet />
                  </BurgerStore>
                }
              >
                <Route path="/" element={<BurgerPage />} />
                <Route path="/shipping" element={<ShippingPage />}>
                  <Route path="contact-info" element={<ContactInfo />} />
                </Route>
              </Route>
              <Route path="/logout" element={<Logout />} />
              <Route
                element={
                  <OrderStore>
                    <Outlet />
                  </OrderStore>
                }
              >
                <Route path="/history" element={<OrderPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
