import React from "react";
import styles from "./style.module.css";
import Shadow from "../Shadow";

const Modal = (props) => {
  return (
    <div>
      <Shadow show={props.show} clearShadow={props.clearShadow} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        className={styles.Modal}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
