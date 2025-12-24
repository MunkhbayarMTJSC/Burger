import React from "react";
import ReactDOM from "react-dom/client";
import { thunk } from "redux-thunk";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerReducer from "./redux/reducer/burgerReducer";
import orderReducer from "./redux/reducer/orderReducer";
import signupReducer from "./redux/reducer/userAuthReducer";

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Prev State: ", store.getState());
  console.log("Action: ", action);
  const result = next(action);
  console.log("Next State: ", store.getState());
  console.groupEnd();
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  userAuth: signupReducer,
});
const middlewares = [thunk, logger];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/Burger">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
