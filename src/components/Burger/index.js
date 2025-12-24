import React from "react";
import styles from "./style.module.css";
import BurgerIngredient from "../BurgerIngredient";
import { connect } from "react-redux";

const Burger = (props) => {
  let content = [];
  const items = Object.entries(props.ingredients || {});
  items.forEach((el, index) => {
    for (let i = 0; i < el[1]; i++) {
      content.push(<BurgerIngredient key={`${index}${i}`} type={el[0]} />);
    }
  });

  if (content.length === 0) {
    content = <p>Хачиртай талхны орцоо сонгоно уу !</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
  };
};

export default connect(mapStateToProps)(Burger);
