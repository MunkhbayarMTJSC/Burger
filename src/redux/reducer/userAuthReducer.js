const initialState = {
  saving: false,
  loading: false,
  firebaseError: null,
  token: null,
  userId: null,
};

const Reducer = (state = initialState, action) => {
  if (action.type === "SIGNUP_USER_START") {
    return {
      ...state,
      saving: true,
    };
  } else if (action.type === "SIGNUP_USER_SUCCESS") {
    return {
      ...state,
      saving: false,
      token: action.token,
      userId: action.userId,
    };
  } else if (action.type === "SIGNUP_USER_FAIL") {
    return {
      ...state,
      saving: false,
      firebaseError: action.payload,
    };
  } else if (action.type === "LOGIN_USER_START") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "LOGIN_USER_SUCCESS") {
    return {
      ...state,
      loading: false,
      token: action.token,
      userId: action.userId,
    };
  } else if (action.type === "LOGIN_USER_FAIL") {
    return {
      ...state,
      loading: false,
      firebaseError: action.payload,
    };
  } else if (action.type === "LOGOUT_USER") {
    return {
      ...state,
      token: null,
      userId: null,
    };
  }
  return state;
};

export default Reducer;
