import React from "react";
import styles from "./style.module.css";
import Burger from "../../components/Burger";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/General/Button";

const ShippingPage = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/", { replace: true });
  };
  const goContactInfo = () => {
    navigate("/shipping/contact-info");
  };
  return (
    <div className={styles.ShippingPage}>
      <p className={styles.Title}>
        <strong>Таны захиалга явагдаж байна!</strong>
      </p>
      <Burger />
      <Button btnType="Danger" text="ЗАХИАЛГА ЦУЦЛАХ" clicked={goBack} />
      <Button
        btnType="Success"
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        clicked={goContactInfo}
      />
      <Outlet />
    </div>
  );
};

export default ShippingPage;
