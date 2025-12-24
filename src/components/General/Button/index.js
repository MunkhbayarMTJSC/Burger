import React from "react";
import styles from "./style.module.css";

const Button = (props) => {
  return (
    <button
      className={`${styles.Button} ${styles[props.btnType]}`}
      onClick={props.clicked}
    >
      {props.text}
    </button>
  );
};

export default Button;
