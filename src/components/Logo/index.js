import React from "react";
import styles from "./style.module.css";
import logoImage from "../../assets/images/burger-logo.png";

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img src={logoImage} alt="App Logo" />
    </div>
  );
};

export default Logo;
