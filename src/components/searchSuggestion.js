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
      {props.suggestionRenderer(props.suggestion, props.searchTerm)}
    </li>
  );
};

Suggestion.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  suggestion: PropTypes.string.isRequired,
  suggestionRenderer: PropTypes.func.isRequired,
};

export default Suggestion;
