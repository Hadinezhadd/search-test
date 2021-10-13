import PropTypes from "prop-types";
import React from "react";

const Suggestion = (props) => {
  const handleClick = () => {
    props.onClick(props.suggestion);
  };

  const handleMouseMove = (event) => {
    props.onMouseMove(event, props.index);
  };

  return (
    <li
      className={props.className}
      key={props.suggestion}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <span>
        <span>{props.searchTerm}</span>
        <strong>{props.suggestion.substr(props.searchTerm?.length)}</strong>
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
