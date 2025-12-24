import React from "react";
import styles from "./style.module.css";

const BuildControl = (props) => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.ing}</div>
      <button
        disabled={props.disabledIngredients[props.type]}
        className={styles.Less}
        onClick={() => props.substractIngredient(props.type)}
      >
        Хасах
      </button>
      <button
        className={styles.More}
        onClick={() => props.addIngredient(props.type)}
      >
        Нэмэх
      </button>
    </div>
  );
};

export default BuildControl;
