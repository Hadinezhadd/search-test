import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import Suggestion from "./searchSuggestion";

const Suggestions = (props) => {
  const handleMouseMove = (event, index) => {
    const { movementX, movementY } = event.nativeEvent;

    if (movementX || movementY) {
      props.onSuggestionHover(index);
    }
  };

  const handleMouseLeave = () => {
    props.onSuggestionHover(null);
  };

  const renderSuggestion = (suggestion, index) => {
    const isFocused = props.focusedSuggestion === index;

    return (
      <Suggestion
        className={classNames({
          [props.styles.suggestion]: true,
          [props.styles.suggestionFocused]: isFocused,
        })}
        index={index}
        key={index}
        onClick={props.onSelection}
        onMouseMove={handleMouseMove}
        searchTerm={props.searchTerm}
        suggestion={suggestion}
      />
    );
  };

  return (
    <ul className={props.styles.suggestions} onMouseLeave={handleMouseLeave}>
      {props.suggestions.map(renderSuggestion)}
    </ul>
  );
};

Suggestions.propTypes = {
  focusedSuggestion: PropTypes.number,
  onSelection: PropTypes.func.isRequired,
  onSuggestionHover: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
};

export default Suggestions;
