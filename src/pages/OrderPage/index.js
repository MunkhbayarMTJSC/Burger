import React, { useEffect } from "react";
import style from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/orderActions";

const OrderPage = (props) => {
  useEffect(() => {
    props.loadOrders(props.userId);
  }, []);

  return (
    <div className={style.OrderPage}>
      <h1>Orders History</h1>
      {props.loading ? (
        <Spinner />
      ) : (
        <div>
          {props.orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              {props.orders.map((el) => (
                <Order key={el[0]} order={el[1]} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    purchased: state.order.purchased,
    userId: state.userAuth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(actions.loadOrders(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
