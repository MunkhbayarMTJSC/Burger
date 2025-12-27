import React, { useEffect, useState } from "react";
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

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  useEffect(() => {
    if (!email) {
      setEmailValid(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    if (!password) {
      setPasswordValid(null);
      return;
    }

    setPasswordValid(password.length >= 6);
  }, [password]);
  useEffect(() => {
    if (!confirmPassword) {
      setPasswordMatch(null);
      return;
    }
    setPasswordMatch(password === confirmPassword);
  }, [confirmPassword]);

  const signup = () => {
    if (password !== confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }
    props.signupUser(email, password);
  };

  if (props.userId) {
    return <Navigate to={"/history"} replace />;
  }
  return (
    <div className={styles.SignupPage}>
      <h2>Signup Page</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputGroup}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
          />
          {emailValid === true && <span className={styles.ok}>✔</span>}
          {emailValid === false && <span className={styles.error}>✖</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
          {passwordValid === true && <span className={styles.ok}>✔</span>}
          {passwordValid === false && <span className={styles.error}>✖</span>}
        </div>
        <div className={styles.inputGroup}>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          {passwordMatch === true && <span className={styles.ok}>✔</span>}
          {passwordMatch === false && <span className={styles.error}>✖</span>}
        </div>
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
