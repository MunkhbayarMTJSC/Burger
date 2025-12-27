import React from "react";
import { connect } from "react-redux";

import styles from "./style.module.css";
import BuildControl from "../BuildControl";

const BuildControls = (props) => {
  const disabledIngredients = { ...props.ingredients };
  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }
  return (
    <div className={styles.BuildControls}>
      <p>
        Бургерийн үнэ: <strong>{props.totalPrice}</strong>
      </p>
      {Object.keys(props.ingredientNames).map((el) => {
        return (
          <BuildControl
            key={el}
            disabledIngredients={disabledIngredients}
            type={el}
            ing={props.ingredientNames[el]}
            addIngredient={props.addIngredient}
            substractIngredient={props.substractIngredient}
          />
        );
      })}
      <button
        disabled={!props.purchasable}
        className={styles.OrderButton}
        onClick={props.showComfirmModal}
      >
        ЗАХИАЛАХ
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredientNames: state.burger.ingredientNames,
    ingredients: state.burger.ingredients,
    purchasable: state.burger.purchasable,
    totalPrice: state.burger.totalPrice,
  };
};

export default connect(mapStateToProps)(BuildControls);
