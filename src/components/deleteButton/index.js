import React from "react";
import styles from "./deleteButton.module.scss";

const Button = () => {
  return (
    <button className={styles.button} type="button">
      Delete
    </button>
  );
};

export default Button;
