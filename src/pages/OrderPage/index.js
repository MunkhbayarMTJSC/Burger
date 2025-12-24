import React, { Component } from "react";
import style from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/orderActions";

class OrderPage extends Component {
  componentDidMount = () => {
    this.props.loadOrders(this.props.userId);
  };

  render() {
    return (
      <div className={style.OrderPage}>
        <h1>Orders History</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            {this.props.orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div>
                {this.props.orders.map((el) => (
                  <Order key={el[0]} order={el[1]} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
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
