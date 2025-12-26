import axios from "axios";

export const signupUser = (name, email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyAC0Cvu2WaQCNrHSl5V52XxwZO72vFilGc]
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAC0Cvu2WaQCNrHSl5V52XxwZO72vFilGc",
        data
      )
      .then((response) => {
        const token = response.data.idToken;
        const userId = response.data.localId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        dispatch(signupUserSuccess(token, userId));
      })
      .catch((error) => {
        dispatch(signupUserFail(error));
      });
  };
};

export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};
export const signupUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId,
  };
};
export const signupUserFail = (error) => {
  return {
    type: "SIGNUP_USER_FAIL",
    payload: error,
  };
};
