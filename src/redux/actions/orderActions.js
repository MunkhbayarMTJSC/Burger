import axios from "../../axiosOrders";

export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    dispatch(loadOrdersStart());
    const token = getState().userAuth.token;

    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        let ordersArray = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(ordersArray));
      })
      .catch((error) => {
        dispatch(loadOrdersFail(error));
      });
  };
};
export const clearOrder = () => {
  return {
    type: "CLEAR_ORDER",
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};
export const loadOrdersSuccess = (orders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    payload: orders,
  };
};
export const loadOrdersFail = (error) => {
  return {
    type: "LOAD_ORDERS_FAIL",
    payload: error,
  };
};

//  Захиалгыг хадгалах үйлдэлүүд энд байна.

export const saveOrder = (orderData) => {
  return function (dispatch, getState) {
    dispatch(saveOrderStart());

    const token = getState().userAuth.token;

    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then((response) => {
        dispatch(saveOrderSuccess(response.data));
      })
      .catch((error) => {
        dispatch(saveOrderFail(error));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = (data) => {
  return {
    type: "SAVE_ORDER_SUCCESS",
    payload: data,
  };
};

export const saveOrderFail = (error) => {
  return {
    type: "SAVE_ORDER_FAIL",
    payload: error,
  };
};
