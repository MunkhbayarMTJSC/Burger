import React from "react";
import styles from "./style.module.css";
import Logo from "../Logo";
import Menu from "../Menu";
import Shadow from "../General/Shadow";

const Sidebar = (props) => {
  let classes = [styles.Sidebar, styles.Close];
  if (props.showSidebar) {
    classes = [styles.Sidebar, styles.Open];
  }
  return (
    <div>
      <Shadow clearShadow={props.toggleSidebar} show={props.showSidebar} />
      <div onClick={props.toggleSidebar} className={classes.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
