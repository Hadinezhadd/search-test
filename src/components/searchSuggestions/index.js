import PropTypes from "prop-types";
import React from "react";
import Suggestion from "../SearchSuggestion";
import { handleMouseMove, handleMouseLeave } from "./methods";
import styles from "./styles.module.scss";

const Suggestions = (props) => {
  const renderSuggestion = (suggestion, index) => {
    return (
      <Suggestion
        index={index}
        key={index}
        onClick={props.onSelection}
        onMouseMove={(event) => handleMouseMove({ event, index, props })}
        searchTerm={props.searchTerm}
        suggestion={suggestion}
        focusedSuggestion={props.focusedSuggestion}
      />
    );
  };

  return (
    <ul
      className={styles.suggestions}
      onMouseLeave={() => handleMouseLeave(props)}
    >
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
