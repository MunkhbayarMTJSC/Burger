import React, { useContext } from "react";
import styles from "./style.module.css";
import BurgerContext from "../../context/BurgerContext";

const BuildControl = (props) => {
  const burgerContext = useContext(BurgerContext);
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.ing}</div>
      <button
        disabled={props.disabledIngredients[props.type]}
        className={styles.Less}
        onClick={() => burgerContext.removeIngredient(props.type)}
      >
        Хасах
      </button>
      <button
        className={styles.More}
        onClick={() => burgerContext.addIngredient(props.type)}
      >
        Нэмэх
      </button>
    </div>
  );
};
export default BuildControl;
