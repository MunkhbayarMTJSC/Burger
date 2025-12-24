import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummery from "../../components/OrderSummery";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    comfirming: false,
    redirect: false,
  };
  continueOrder = () => {
    this.setState({ redirect: true });
    this.hideComfirmModal();
  };

  showComfirmModal = () => {
    this.setState({ comfirming: true });
  };
  hideComfirmModal = () => {
    this.setState({ comfirming: false });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/shipping" />;
    }

    return (
      <div>
        <Modal show={this.state.comfirming} clearShadow={this.hideComfirmModal}>
          <OrderSummery
            onCancel={this.hideComfirmModal}
            onConfirm={this.continueOrder}
          />
        </Modal>

        <Burger />
        <BuildControls
          showComfirmModal={this.showComfirmModal}
          hideComfirmModal={this.hideComfirmModal}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
export default connect(mapStateToProps)(BurgerBuilder);
