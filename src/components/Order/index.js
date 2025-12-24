import React from "react";
import style from "./style.module.css";

const Order = (props) => {
  return (
    <div className={style.Order}>
      <p>Орц:</p>
      <ul>
        <li>Гахайн мах: {props.order.ingredients.bacon}</li>
        <li>Салад: {props.order.ingredients.salad}</li>
        <li>Үхрийн мах: {props.order.ingredients.meat}</li>
        <li>Бяслага: {props.order.ingredients.cheese}</li>
      </ul>
      <p>
        Захиалагч: {props.order.customer.name} |{" "}
        {props.order.customer.address.street} |{" "}
        {props.order.customer.address.country}
      </p>
      <p>
        Үнийн дүн: <strong>{props.order.price}₮</strong>
      </p>
    </div>
  );
};

export default Order;
