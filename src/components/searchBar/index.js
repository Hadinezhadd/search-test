import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import htmlElementAttributes from "react-html-attributes";
import { pick } from "lodash";
import Suggestions from "../SearchSuggestions";
import styles from "./styles.module.scss";
import ClearButton from "../ClearButton";
import SearchButton from "../SearchButton";
import { handleClick, clearInput, search, handleSelection,
  handleHover, handleChange, toggleFocus, handleKeyDown } from "./methods";

const SearchBar = (props) => {
  const [focusedSuggestion, setFocusedSuggestion] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [value, setValue] = useState("");
  const container = useRef();
  const input = useRef();
  const attributes = pick(props, htmlElementAttributes.input);

  useEffect(() => {
    if (props.autoFocus) {
      input.current.focus();
    }
    document.addEventListener("click", (event) => handleClick({ event, props, container }));
    return () => {
    document.removeEventListener("click", (event) => handleClick({ event, props, container }));
    };
  }, []);

  const shouldRenderClearButton = value && props.shouldRenderClearButton;
  const shouldRenderSuggestions = value && props.suggestions.length > 0;
  return (
    <form role="search" ref={container}>
      <label htmlFor="header-search" className={styles.visuallyHidden}>
        Search
      </label>
      <div
        className={classNames({ [styles.field]: true, [styles.fieldFocused]: isFocused,
          [styles.hasSuggestions]: props.suggestions.length > 0 })}>
        <input
          {...attributes}
          className={styles.input}
          id="header-search"
          type="text"
          ref={input}
          value={value}
          onChange={(event) => handleChange({ event, setFocusedSuggestion, setSearchTerm, setValue, input, props })}
          onFocus={() => toggleFocus({ setIsFocused, isFocused })}
          onBlur={() => toggleFocus({ setIsFocused, isFocused })}
          onKeyDown={ props.suggestions &&
            ((event) => handleKeyDown(
              { event, props, setFocusedSuggestion, setSearchTerm, input, focusedSuggestion, setValue, searchTerm }
            )) }
         />
        {shouldRenderClearButton && (
          <ClearButton onClick={() => clearInput({ setFocusedSuggestion, setSearchTerm, setValue, input, props })} /> 
        )}
        {props.shouldRenderSearchButton && ( <SearchButton onClick={() => search({ props, focusedSuggestion })} />)}
      </div>
      {shouldRenderSuggestions && (
        <Suggestions
          focusedSuggestion={focusedSuggestion}
          onSelection={(suggestion) =>
            handleSelection({ setFocusedSuggestion, setValue, props, suggestion })}
          onSuggestionHover={(current) =>handleHover({ current, setFocusedSuggestion })}
          searchTerm={searchTerm}
          suggestions={props.suggestions}
        />
      )}
    </form>
  );
};

SearchBar.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSelection: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  shouldRenderClearButton: PropTypes.bool.isRequired,
  shouldRenderSearchButton: PropTypes.bool.isRequired,
  suggestions: PropTypes.array.isRequired,
};
SearchBar.defaultProps = {
  onSearch: () => {},
};
export default SearchBar;
