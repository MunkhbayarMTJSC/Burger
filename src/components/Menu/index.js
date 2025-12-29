import React, { useContext } from "react";
import styles from "./style.module.css";
import MenuItem from "../MenuItem";
import UserContext from "../../context/UserContext";

const Menu = (props) => {
  const ctx = useContext(UserContext);
  return (
    <div>
      <ul className={styles.Menu}>
        {ctx.state.userId ? (
          <>
            <MenuItem link="/">ШИНЭ ЗАХИАЛГА</MenuItem>
            <MenuItem link="/history">ЗАХИАЛГЫН ТҮҮХ</MenuItem>
            <MenuItem link="/logout">ГАРАХ</MenuItem>
          </>
        ) : (
          <>
            <MenuItem link="/login">НЭВТРЭХ</MenuItem>
            <MenuItem link="/signup">БҮТГҮҮЛЭХ</MenuItem>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
