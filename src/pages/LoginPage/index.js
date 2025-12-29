import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";

const LoginPage = (props) => {
  const ctx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    ctx.loginUser(email, password);
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
  if (ctx.state.userId) {
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
        {ctx.state.error && (
          <p style={{ color: "red" }}>
            {ctx.state.error.response.data.error.message}
          </p>
        )}
        {ctx.state.saving && <Spinner />}
        <Button btnType="Success" text="LOGIN" clicked={login} />
      </form>
    </div>
  );
};
export default LoginPage;
