import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../components/General/Button";
import * as action from "../../redux/actions/loginAction";
import Spinner from "../../components/General/Spinner";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    props.loginUser(email, password);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };
  if (props.userId) {
    return <Navigate to={"/history"} replace />;
  }
  return (
    <div className={styles.LoginPage}>
      <h2>Login Page</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
        />
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <br />
        {props.error && (
          <p style={{ color: "red" }}>
            {props.error.response.data.error.message}
          </p>
        )}
        {props.saving && <Spinner />}
        <Button btnType="Success" text="LOGIN" clicked={login} />
      </form>
    </div>
  );
};
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
