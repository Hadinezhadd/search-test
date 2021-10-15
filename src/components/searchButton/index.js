import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

const SearchButton = (props) => {
  return (
    <button
      className={styles.submitButton}
      onClick={props.onClick}
      type="button"
      aria-label="Submit Search"
    ></button>
  );
};

SearchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchButton;
