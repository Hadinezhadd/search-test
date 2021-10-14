import { isNil } from "lodash";

// on ArrowUp or ArrowDown calculates the item index
export const getNextIndex = ({ current, last, isScrollingDown }) => {
  let next = null;
  if (isScrollingDown && current !== last) {
    next = isNil(current) ? 0 : current + 1;
  } else if (!isScrollingDown && current !== 0) {
    next = isNil(current) ? last : current - 1;
  }
  return next;
};

// on ArrowUp or ArrowDown sets the selected item and input value
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

// on press the backspace button pick up focus on item in the suggestion list
export const handleBackspace = ({ setFocusedSuggestion }) => {
  setFocusedSuggestion(null);
};

// on press the escape button clear suggestions list and blur input
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
