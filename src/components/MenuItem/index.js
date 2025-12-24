import React from "react";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
  return (
    <li className={styles.MenuItem}>
      <NavLink
        to={props.link}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default MenuItem;
