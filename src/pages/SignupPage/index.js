import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../../components/General/Button";
import * as action from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";

class SignupPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  };
  signup = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "Нууц үг таарахгүй байна" });
      return;
    }
    this.props.signupUser(this.state.email, this.state.password);
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
      <div className={styles.SignupPage}>
        <h2>Signup Page</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            placeholder="Name"
          />
          <br />
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
          <input
            onChange={this.handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <br />
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
          {this.props.error && (
            <p style={{ color: "red" }}>
              {this.props.error.response.data.error.message}
            </p>
          )}
          {this.props.saving && <Spinner />}
          <Button btnType="Success" text="SIGNUP" clicked={this.signup} />
        </form>
      </div>
    );
  }
}
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
