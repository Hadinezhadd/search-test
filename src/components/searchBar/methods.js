import { isNil } from "lodash";

export const handleClick = ({ event, props, container }) => {
  if (!container.current?.contains(event.target)) {
    props.onClear();
  }
};

export const getNextIndex = ({ current, last, isScrollingDown }) => {
  let next = null;

  if (isScrollingDown && current !== last) {
    next = isNil(current) ? 0 : current + 1;
  } else if (!isScrollingDown && current !== 0) {
    next = isNil(current) ? last : current - 1;
  }

  return next;
};

export const setItemSuggestion = ({
  isScrollingDown,
  props,
  focusedSuggestion,
  setFocusedSuggestion,
  setValue,
  searchTerm,
}) => {
  const current = focusedSuggestion;
  const { suggestions } = props;
  const last = suggestions.length - 1;
  const next = getNextIndex({ current, last, isScrollingDown });
  setFocusedSuggestion(next);
  setValue(suggestions[next] || searchTerm);
};

export const clearInput = ({
  setFocusedSuggestion,
  setSearchTerm,
  setValue,
  input,
  props,
}) => {
  setFocusedSuggestion(null);
  setSearchTerm(null);
  setValue("");
  input.current.focus();
  props.onClear();
};

export const toggleFocus = ({ setIsFocused, isFocused }) => {
  setIsFocused(!isFocused);
};

export const handleDebouncedChange = ({ searchTerm, props, setSearchTerm }) => {
  setSearchTerm(searchTerm);
  props.onChange(searchTerm);
};

export const handleChange = ({
  event,
  setFocusedSuggestion,
  setSearchTerm,
  setValue,
  input,
  props,
}) => {
  const { value } = event.target;
  const searchTerm = value.toLowerCase().trim();

  if (!value) {
    clearInput({
      setFocusedSuggestion,
      setSearchTerm,
      setValue,
      input,
      props,
    });
    return;
  }

  setFocusedSuggestion(null);

  setValue(value);
  if (searchTerm) {
    handleDebouncedChange({ searchTerm, props, setSearchTerm });
  }
};

export const handleKeyDown = ({
  event,
  props,
  setFocusedSuggestion,
  setSearchTerm,
  input,
}) => {
  if (
    (event.key === "ArrowUp" || event.key === "ArrowDown") &&
    props.suggestions.length > 0
  ) {
    event.preventDefault();
    setItemSuggestion({ isScrollingDown: event.key === "ArrowDown", props });
  }
  if (event.key === "Backspace") {
    handleBackspace({ setFocusedSuggestion });
  }
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
  if (event.key === "Escape") {
    handleEscape({ setFocusedSuggestion, setSearchTerm, input, props });
  }
};

export const handleBackspace = ({ setFocusedSuggestion }) => {
  setFocusedSuggestion(null);
};

export const handleEscape = ({
  setFocusedSuggestion,
  setSearchTerm,
  input,
  props,
}) => {
  setFocusedSuggestion(null);
  setSearchTerm("");
  input.current.blur();
  props.onClear();
};

export const handleHover = ({ current, setFocusedSuggestion }) => {
  setFocusedSuggestion(current);
};

export const handleSelection = ({
  setFocusedSuggestion,
  setValue,
  props,
  suggestion,
}) => {
  setFocusedSuggestion(null);
  setValue(suggestion);

  props.onClear();

  if (props.onSelection) {
    props.onSelection(suggestion);
  }
};

export const search = ({ props, value }) => {
  props.onClear();
  props.onSearch(value.trim());
};
