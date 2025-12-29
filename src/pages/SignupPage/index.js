import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";

const SignupPage = (props) => {
  const ctx = useContext(UserContext);

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
    ctx.signupUser(email, password);
  };

  if (ctx.state.userId) {
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
        {ctx.state.error && (
          <p style={{ color: "red" }}>
            {ctx.state.error.response.data.error.message}
          </p>
        )}
        {ctx.state.saving && <Spinner />}
        <Button btnType="Success" text="SIGNUP" clicked={signup} />
      </form>
    </div>
  );
};
export default SignupPage;
