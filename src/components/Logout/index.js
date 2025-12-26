import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as actions from "../../redux/actions/loginAction";

const Logout = (props) => {
  useEffect(() => {
    props.logoutUser();
  }, []);
  return <Navigate to={"/"} replace />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actions.logoutUser()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
