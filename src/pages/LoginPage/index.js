import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../components/General/Button";
import * as action from "../../redux/actions/loginAction";
import Spinner from "../../components/General/Spinner";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };
  login = () => {
    this.props.loginUser(this.state.email, this.state.password);
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    if (this.props.userId) {
      return <Navigate to={"/history"} replace />;
    }
    return (
      <div className={styles.LoginPage}>
        <h2>Login Page</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            placeholder="Email"
          />
          <br />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <br />
          {this.props.error && (
            <p style={{ color: "red" }}>
              {this.props.error.response.data.error.message}
            </p>
          )}
          {this.props.saving && <Spinner />}
          <Button btnType="Success" text="LOGIN" clicked={this.login} />
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.userAuth.loading,
    error: state.userAuth.firebaseError,
    userId: state.userAuth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => {
      dispatch(action.loginUser(email, password));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
