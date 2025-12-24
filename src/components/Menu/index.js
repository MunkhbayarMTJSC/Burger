import React, { Fragment } from "react";
import { connect } from "react-redux";
import styles from "./style.module.css";
import MenuItem from "../MenuItem";

const Menu = (props) => {
  return (
    <div>
      <ul className={styles.Menu}>
        {props.userId ? (
          <Fragment>
            <MenuItem link="/">ШИНЭ ЗАХИАЛГА</MenuItem>
            <MenuItem link="/history">ЗАХИАЛГЫН ТҮҮХ</MenuItem>
            <MenuItem link="/logout">ГАРАХ</MenuItem>
          </Fragment>
        ) : (
          <Fragment>
            <MenuItem link="/login">НЭВТРЭХ</MenuItem>
            <MenuItem link="/signup">БҮТГҮҮЛЭХ</MenuItem>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userAuth.userId,
  };
};

export default connect(mapStateToProps)(Menu);
