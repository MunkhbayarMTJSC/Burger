import React, { useContext } from "react";
import styles from "./style.module.css";
import Button from "../General/Button";
import BurgerContext from "../../context/BurgerContext";
const OrderSummery = (props) => {
  const burgerContext = useContext(BurgerContext);
  return (
    <div className={styles.OrderSummery}>
      <h3>Таны захиалгын дэлгэрэнгүй</h3>
      <p>Орц:</p>
      <ul>
        {Object.keys(burgerContext.burger.ingredients).map((el) => (
          <li key={el}>
            <span>{burgerContext.burger.ingredientNames[el]}</span>:{" "}
            {burgerContext.burger.ingredients[el]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Нийт үнэ: {burgerContext.burger.totalPrice}₮</strong>
      </p>
      <p>Үргэлжлүүлэх үү?</p>
      <Button btnType="Danger" text="ТАТГАЛЗАХ" clicked={props.onCancel} />
      <Button btnType="Success" text="ҮРГЭЛЖЛҮҮЛЭХ" clicked={props.onConfirm} />
    </div>
  );
};

export default OrderSummery;
