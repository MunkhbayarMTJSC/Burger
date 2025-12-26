import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../components/General/Button";
import * as action from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";

const SignupPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const signup = () => {
    if (password !== confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }
    props.signupUser(email, password);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  if (props.userId) {
    return <Navigate to={"/history"} replace />;
  }
  return (
    <div className={styles.SignupPage}>
      <h2>Signup Page</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
        />
        <br />
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
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {props.error && (
          <p style={{ color: "red" }}>
            {props.error.response.data.error.message}
          </p>
        )}
        {props.saving && <Spinner />}
        <Button btnType="Success" text="SIGNUP" clicked={signup} />
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    saving: state.userAuth.saving,
    error: state.userAuth.firebaseError,
    userId: state.userAuth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(action.signupUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
