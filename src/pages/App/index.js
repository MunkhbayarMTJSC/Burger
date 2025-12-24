import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import React, { Component } from "react";
import { connect } from "react-redux";
import BurgerPage from "../BurgerPage";
import Sidebar from "../../components/Sidebar";
import OrderPage from "../OrderPage";
import { Route, Routes } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import ContactInfo from "../../components/ContactInfo";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import ProtectedRoute from "../../components/ProtectedRoute";
import * as action from "../../redux/actions/loginAction";

class App extends Component {
  state = {
    showSidebar: false,
  };
  toggleSidebar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        this.props.autologin(token, userId);
        this.props.autoLogout(
          (expireDate.getTime() - new Date().getTime()) * 1000
        );
      } else {
        this.props.logout();
      }
    }
  };
  render() {
    return (
      <div>
        <Toolbar toggleSidebar={this.toggleSidebar} />
        <Sidebar
          showSidebar={this.state.showSidebar}
          toggleSidebar={this.toggleSidebar}
        />
        <main className={css.Content}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<BurgerPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/shipping" element={<ShippingPage />}>
                <Route path="contact-info" element={<ContactInfo />} />
              </Route>
              <Route path="/history" element={<OrderPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.userAuth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autologin: (token, userId) => {
      dispatch(action.loginUserSuccess(token, userId));
    },
    logout: () => {
      dispatch(action.logoutUser());
    },
    autoLogout: (ms) => {
      dispatch(action.autoLogoutUser(ms));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
