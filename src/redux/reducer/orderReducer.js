const initialState = {
  // load orders
  orders: [],
  loading: false,
  // save orders
  newOrder: {
    saving: false,
    finished: false,
    error: null,
  },
};
const Reducer = (state = initialState, action) => {
  if (action.type === "LOAD_ORDERS_START") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "LOAD_ORDERS_SUCCESS") {
    return {
      ...state,
      orders: action.payload,
      loading: false,
    };
  } else if (action.type === "LOAD_ORDERS_FAIL") {
    return {
      ...state,
      loading: false,
    };
  } else if (action.type === "SAVE_ORDER_START") {
    return {
      ...state,
      newOrder: {
        ...state.newOrder,
        saving: true,
      },
    };
  } else if (action.type === "SAVE_ORDER_SUCCESS") {
    return {
      ...state,
      newOrder: {
        ...state.newOrder,
        saving: false,
        finished: true,
        error: null,
      },
    };
  } else if (action.type === "SAVE_ORDER_FAIL") {
    return {
      ...state,
      newOrder: {
        ...state.newOrder,
        saving: false,
        finished: false,
        error: action.payload,
      },
    };
  }
  return state;
};
export default Reducer;
