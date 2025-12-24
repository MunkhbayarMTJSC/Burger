import axios from "axios";

export const loginUser = (email, password) => {
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
  return function (dispatch) {
    dispatch(loginUserStart());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAC0Cvu2WaQCNrHSl5V52XxwZO72vFilGc",
        data
      )
      .then((response) => {
        // LocalStorage руу бичилт хийх
        const token = response.data.idToken;
        const userId = response.data.localId;
        const expiresIn = response.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = response.data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(loginUserSuccess(token, userId));
        dispatch(autoLogoutUser(expiresIn * 1000));
      })
      .catch((error) => {
        dispatch(loginUserFail(error));
      });
  };
};

export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};

export const loginUserSuccess = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userId,
  };
};
export const loginUserFail = (error) => {
  return {
    type: "LOGIN_USER_FAIL",
    payload: error,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT_USER",
  };
};
export const autoLogoutUser = (ms) => {
  return function (dispatch) {
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyAC0Cvu2WaQCNrHSl5V52XxwZO72vFilGc",
    //     {
    //       grant_type: "refresh_token",
    //       refresh_token: localStorage.getItem("refreshToken"),
    //     }
    //   )
    //   .then((response) => {
    //     const token = response.data.id_token;
    //     const userId = response.data.user_id;
    //     dispatch(loginUserSuccess(token, userId));
    //   });
    setTimeout(() => {
      dispatch(logoutUser());
    }, ms);
  };
};
