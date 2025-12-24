import React from "react";
import styles from "./style.module.css";

const HamburgerMenu = (props) => {
  return (
    <div className={styles.HamburgerMenu} onClick={props.toggleSidebar}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default HamburgerMenu;
