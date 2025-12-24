import React from "react";
import styles from "./style.module.css";
import Logo from "../Logo";
import Menu from "../Menu";
import HamburgerMenu from "../HamburgerMenu";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <HamburgerMenu toggleSidebar={props.toggleSidebar} />
      <Logo />
      <nav className={styles.HideOnMobile}>
        <Menu />
      </nav>
    </header>
  );
};

export default Toolbar;
