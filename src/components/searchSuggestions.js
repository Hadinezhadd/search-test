import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import Suggestion from "./searchSuggestion";
import styles from "./search.module.css";

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
          [styles.suggestion]: true,
          [styles.suggestionFocused]: isFocused,
        })}
        index={index}
        key={index}
        onClick={props.onSelection}
        onMouseMove={handleMouseMove}
        searchTerm={props.searchTerm}
        suggestion={suggestion}
        suggestionRenderer={props.suggestionRenderer}
      />
    );
  };

  return (
    <ul className={styles.suggestions} onMouseLeave={handleMouseLeave}>
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
