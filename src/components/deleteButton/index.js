import React from "react";
import styles from "./styles.module.scss";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      onClick={() => props.onClick()}
      type="reset"
    >
      {props.title}
    </button>
  );
};

export default Button;
