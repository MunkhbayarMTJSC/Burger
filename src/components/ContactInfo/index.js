import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import BurgerContext from "../../context/BurgerContext";
import UserContext from "../../context/UserContext";

const ContactInfo = (props) => {
  const navigate = useNavigate();
  const burgerContext = useContext(BurgerContext);
  const userCtx = useContext(UserContext);
  const [state, setState] = useState({
    customer: {
      address: {
        country: "",
        street: "",
        zipCode: "",
      },
      name: "",
    },
    ingredients: burgerContext.burger.ingredients,
    price: burgerContext.burger.totalPrice,
    userId: userCtx.state.userId,
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
    burgerContext.saveBurgerToServer(userCtx.state.token, orderData);
  };
  useEffect(() => {
    if (burgerContext.burger.finished) {
      navigate("/history", { replace: true });
    }
    return () => {
      // Цэвэрлэгч функц
      burgerContext.clearBurger();
    };
  }, [burgerContext.burger.finished]);

  return (
    <div className={styles.ContactInfo}>
      <h2>Хүргэлтийн мэдээлэл</h2>
      <p>
        Захиалгын үнэ: <strong>{state.price}₮</strong>
      </p>
      <div>
        {burgerContext.burger.error && "Алдаа гарлаа. Дахин оролдоно уу."}
      </div>
      <br />
      {burgerContext.burger.saving ? (
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
export default ContactInfo;
