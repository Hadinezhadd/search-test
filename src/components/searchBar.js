import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import htmlElementAttributes from "react-html-attributes";
import { debounce, isNil, pick } from "lodash";
import Suggestions from "./searchSuggestions";
import styles from "./search.module.scss";

const SearchBar = (props) => {
  const [focusedSuggestion, setFocusedSuggestion] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [value, setValue] = useState("");
  const container = useRef();
  const input = useRef();
  const attributes = pick(props, htmlElementAttributes.input);

  const handleClick = (event) => {
    if (!container.current?.contains(event.target)) {
      props.onClear();
    }
  };

  useEffect(() => {
    if (props.autoFocus) {
      input.current.focus();
    }
    console.log("effect");
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const getNextIndex = (current, last, isScrollingDown) => {
    let next = null;

    if (isScrollingDown && current !== last) {
      next = isNil(current) ? 0 : current + 1;
    } else if (!isScrollingDown && current !== 0) {
      next = isNil(current) ? last : current - 1;
    }

    return next;
  };

  const setItemSuggestion = (isScrollingDown) => {
    const current = focusedSuggestion;
    const { suggestions } = props;
    const last = suggestions.length - 1;
    const next = getNextIndex(current, last, isScrollingDown);
    setFocusedSuggestion(next);
    setValue(suggestions[next] || searchTerm);
  };

  const clearInput = () => {
    setFocusedSuggestion(null);
    setSearchTerm(null);
    setValue("");
    input.current.focus();
    props.onClear();
  };

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleDebouncedChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    props.onChange(searchTerm);
  };
  const handleDebouncedChangeSearch = debounce(
    handleDebouncedChange,
    props.delay
  );

  const handleChange = (event) => {
    const { value } = event.target;
    const searchTerm = value.toLowerCase().trim();

    if (!value) {
      clearInput();
      return;
    }

    setFocusedSuggestion(null);

    setValue(value);
    if (searchTerm) {
      handleDebouncedChangeSearch(searchTerm);
    }
  };

  const handleKeyDown = (event) => {
    if (
      (event.key === "ArrowUp" || event.key === "ArrowDown") &&
      props.suggestions.length > 0
    ) {
      event.preventDefault();
      setItemSuggestion(event.key === "ArrowDown");
    }
    if (event.key === "Backspace") {
      handleBackspace();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
    if (event.key === "Escape") {
      handleEscape();
    }
  };

  const handleBackspace = () => {
    setFocusedSuggestion(null);
  };

  const handleEscape = () => {
    setFocusedSuggestion(null);
    setSearchTerm("");
    input.current.blur();
    props.onClear();
  };

  const handleHover = (current) => {
    setFocusedSuggestion(current);
  };

  const handleSelection = (suggestion) => {
    setFocusedSuggestion(null);
    setValue(suggestion);

    props.onClear();

    if (props.onSelection) {
      props.onSelection(suggestion);
    }
  };

  const search = () => {
    props.onClear();
    props.onSearch(value.trim());
  };

  const renderClearButton = () => {
    return (
      <button className={styles.clearButton} onClick={clearInput} type="reset">
        <span className={styles.visuallyHidden}>Clear Search</span>
      </button>
    );
  };

  // it doesn't do anything at this time it just for showing how should define 'search submit button' for accessibility
  const renderSearchButton = () => {
    return (
      <button className={styles.submitButton} onClick={search} type="button">
        <span className={styles.visuallyHidden}>Submit Search</span>
      </button>
    );
  };

  const renderSuggestions = (searchTerm, styles) => {
    return (
      <Suggestions
        focusedSuggestion={focusedSuggestion}
        onSelection={handleSelection}
        onSuggestionHover={handleHover}
        searchTerm={searchTerm}
        styles={styles}
        suggestions={props.suggestions}
      />
    );
  };

  const shouldRenderClearButton = value && props.shouldRenderClearButton;
  const shouldRenderSuggestions = value && props.suggestions.length > 0;
  return (
    <form role="search" className={styles.wrapper} ref={container}>
      <label htmlFor="header-search">
        <span className={styles.visuallyHidden}>Search</span>
      </label>
      <div
        className={classNames({
          [styles.field]: true,
          [styles.fieldFocused]: isFocused,
          [styles.hasSuggestions]: props.suggestions.length > 0,
        })}
      >
        <input
          {...attributes}
          className={styles.input}
          id="header-search"
          type="text"
          ref={input}
          value={value}
          onChange={handleChange}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          onKeyDown={props.suggestions && handleKeyDown}
        />
        {shouldRenderClearButton && renderClearButton()}
        {props.shouldRenderSearchButton && renderSearchButton()}
      </div>
      {shouldRenderSuggestions && renderSuggestions(searchTerm, styles)}
    </form>
  );
};

SearchBar.propTypes = {
  autoFocus: PropTypes.bool,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onSelection: PropTypes.func,
  shouldRenderClearButton: PropTypes.bool,
  shouldRenderSearchButton: PropTypes.bool,
  suggestions: PropTypes.array.isRequired,
};

SearchBar.defaultProps = {
  autoFocus: false,
  delay: 0,
  maxLength: 100,
  placeholder: "",
  shouldRenderClearButton: false,
  shouldRenderSearchButton: false,
};

export default SearchBar;
