import React from "react";
import styles from "./style.module.css";
import Button from "../General/Button";
import { connect } from "react-redux";
const OrderSummery = (props) => {
  console.log(
    Object.keys(props.ingredients).map((el) => props.ingredientNames[el])
  );
  return (
    <div className={styles.OrderSummery}>
      <h3>Таны захиалгын дэлгэрэнгүй</h3>
      <p>Орц:</p>
      <ul>
        {Object.keys(props.ingredients).map((el) => (
          <li key={el}>
            <span>{props.ingredientNames[el]}</span>: {props.ingredients[el]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Нийт үнэ: {props.totalPrice}₮</strong>
      </p>
      <p>Үргэлжлүүлэх үү?</p>
      <Button btnType="Danger" text="ТАТГАЛЗАХ" clicked={props.onCancel} />
      <Button btnType="Success" text="ҮРГЭЛЖЛҮҮЛЭХ" clicked={props.onConfirm} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    ingredientNames: state.burger.ingredientNames,
  };
};

export default connect(mapStateToProps)(OrderSummery);
