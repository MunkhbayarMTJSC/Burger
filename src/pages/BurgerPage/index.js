import React, { useState } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummery from "../../components/OrderSummery";
import { Navigate } from "react-router-dom";

const BurgerBuilder = (props) => {
  const [confirming, setConfirming] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const continueOrder = () => {
    setRedirect(true);
    hideComfirmModal();
  };

  const showComfirmModal = () => {
    setConfirming(true);
  };
  const hideComfirmModal = () => {
    setConfirming(false);
  };

  if (redirect) {
    return <Navigate to="/shipping" />;
  }

  return (
    <div>
      <Modal show={confirming} clearShadow={hideComfirmModal}>
        <OrderSummery onCancel={hideComfirmModal} onConfirm={continueOrder} />
      </Modal>

      <Burger />
      <BuildControls
        showComfirmModal={showComfirmModal}
        hideComfirmModal={hideComfirmModal}
      />
    </div>
  );
};
export default BurgerBuilder;
