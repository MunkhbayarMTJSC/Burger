import React, { useContext } from "react";

import styles from "./style.module.css";
import BuildControl from "../BuildControl";
import BurgerContext from "../../context/BurgerContext";

const BuildControls = (props) => {
  const burgerContext = useContext(BurgerContext);
  const disabledIngredients = { ...burgerContext.burger.ingredients };
  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }
  return (
    <div className={styles.BuildControls}>
      <p>
        Бургерийн үнэ: <strong>{burgerContext.burger.totalPrice}</strong>
      </p>
      {Object.keys(burgerContext.burger.ingredientNames).map((el) => {
        return (
          <BuildControl
            key={el}
            disabledIngredients={disabledIngredients}
            type={el}
            ing={burgerContext.burger.ingredientNames[el]}
          />
        );
      })}
      <button
        disabled={!burgerContext.burger.purchasable}
        className={styles.OrderButton}
        onClick={props.showComfirmModal}
      >
        ЗАХИАЛАХ
      </button>
    </div>
  );
};
export default BuildControls;
