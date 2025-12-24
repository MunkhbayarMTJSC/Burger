import React from "react";
import styles from "./style.module.css";

const BurgerIngredient = (props) => {
  if (props.type === "bread-top")
    return (
      <div className={styles.BreadTop}>
        <div className={styles.Seed}></div>
        <div className={`${styles.Seed} ${styles.Second}`}></div>
        <div className={`${styles.Seed} ${styles.Third}`}></div>
        <div className={`${styles.Seed} ${styles.Fourth}`}></div>
      </div>
    );
  if (props.type === "bread-bottom")
    return <div className={styles.BreadBottom}></div>;
  if (props.type === "meat") return <div className={styles.Meat}></div>;
  if (props.type === "cheese") return <div className={styles.Cheese}></div>;
  if (props.type === "salad") return <div className={styles.Salad}></div>;
  if (props.type === "bacon") return <div className={styles.Bacon}></div>;
};
export default BurgerIngredient;
