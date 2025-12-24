import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import * as action from "../../redux/actions/orderActions";

const ContactInfo = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    customer: {
      address: {
        country: "",
        street: "",
        zipCode: "",
      },
      name: "",
    },
    ingredients: props.ingredients,
    price: props.totalPrice,
    userId: props.userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["country", "street", "zipCode"].includes(name)) {
      setState((prev) => ({
        ...prev,
        customer: {
          ...prev.customer,
          address: {
            ...prev.customer.address,
            [name]: value,
          },
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        customer: {
          ...prev.customer,
          [name]: value,
        },
      }));
    }
  };
  const submitOrderHandler = () => {
    const orderData = {
      ingredients: state.ingredients,
      price: state.price,
      customer: state.customer,
      userId: state.userId,
    };
    props.saveOrder(orderData);
  };
  useEffect(() => {
    if (props.newOrderStatus.finished) {
      navigate("/history", { replace: true });
    }
  });

  return (
    <div className={styles.ContactInfo}>
      <h2>Хүргэлтийн мэдээлэл</h2>
      <p>
        Захиалгын үнэ: <strong>{state.price}₮</strong>
      </p>
      <div>
        {props.newOrderStatus.error && "Алдаа гарлаа. Дахин оролдоно уу."}
      </div>
      <br />
      {props.newOrderStatus.saving ? (
        <Spinner />
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Таны нэр"
            value={state.customer.name || ""}
          />{" "}
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="country"
            placeholder="Улс"
            value={state.customer.address.country || ""}
          />{" "}
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="street"
            placeholder="Гудамж"
            value={state.customer.address.street || ""}
          />{" "}
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="zipCode"
            placeholder="Зип код"
            value={state.customer.address.zipCode || ""}
          />{" "}
          <br />
          <Button
            btnType="Success"
            text="ЗАХИАЛГА БҮРТГЭХ"
            clicked={submitOrderHandler}
          />
        </form>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    newOrderStatus: state.order.newOrder,
    userId: state.userAuth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrder: (orderData) => dispatch(action.saveOrder(orderData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
