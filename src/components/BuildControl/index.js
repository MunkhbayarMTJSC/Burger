import React from "react";
import { connect } from "react-redux";
import styles from "./style.module.css";
import * as actions from "../../redux/actions/burgerActions";

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
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (type) => dispatch(actions.addIngredient(type)),
    substractIngredient: (type) => dispatch(actions.substractIngredient(type)),
  };
};
export default connect(null, mapDispatchToProps)(BuildControl);
