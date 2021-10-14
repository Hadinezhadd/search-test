import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { handleClick, handleMouseMove } from "./methods";
import styles from "./styles.module.scss";

const Suggestion = (props) => {
  const isFocused = props.focusedSuggestion === props.index;
  return (
    <li
      className={classNames({
        [styles.suggestion]: true,
        [styles.suggestionFocused]: isFocused,
      })}
      key={props.suggestion}
      onClick={() => handleClick(props)}
      onMouseMove={(event) => handleMouseMove({ event, props })}
    >
      <span>
        <strong>{props.suggestion}</strong>
      </span>
    </li>
  );
};

Suggestion.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  suggestion: PropTypes.string.isRequired,
};

export default Suggestion;
