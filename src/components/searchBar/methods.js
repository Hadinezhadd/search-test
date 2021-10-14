import { setItemSuggestion, handleBackspace, handleEscape } from "./partials";
//if user click outside of the search form closes the suggestion list
export const handleClick = ({ event, props, container }) => {
  if (!container.current?.contains(event.target)) {
    props.onClear();
  }
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
    clearInput({ setFocusedSuggestion, setSearchTerm, setValue, input, props });
    return;
  }
  setFocusedSuggestion(null);
  setValue(value);
  if (searchTerm) {
    setSearchTerm(searchTerm);
    props.onChange(searchTerm);
  }
};
export const handleKeyDown = ({
  event,
  props,
  setFocusedSuggestion,
  focusedSuggestion,
  setSearchTerm,
  input,
  setValue,
  searchTerm,
}) => {
  if (
    (event.key === "ArrowUp" || event.key === "ArrowDown") &&
    props.suggestions.length > 0
  ) {
    event.preventDefault();
    setItemSuggestion({
      isScrollingDown: event.key === "ArrowDown",
      props,
      focusedSuggestion,
      setFocusedSuggestion,
      setValue,
      searchTerm,
    });
  }
  if (event.key === "Backspace") {
    handleBackspace({ setFocusedSuggestion });
  }
  if (event.key === "Enter") {
    event.preventDefault();
    search({ props, focusedSuggestion });
  }
  if (event.key === "Escape") {
    handleEscape({ setFocusedSuggestion, setSearchTerm, input, props });
  }
};
//handle hover on an item in the suggestions list
export const handleHover = ({ current, setFocusedSuggestion }) => {
  setFocusedSuggestion(current);
};
//when user select a item reset search and call onSelection action
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
export const search = ({ props, focusedSuggestion }) => {
  props.onSelection(props.suggestions[focusedSuggestion]);
  props.onClear();
};
