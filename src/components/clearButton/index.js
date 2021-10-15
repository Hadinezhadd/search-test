import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

const ClearButton = (props) => {
  return (
    <button
      className={styles.clearButton}
      onClick={props.onClick}
      type="reset"
      aria-label="Clear Search"
      title="Clear Search"
    ></button>
  );
};

ClearButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ClearButton;
