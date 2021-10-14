export const handleMouseMove = ({ event, index, props }) => {
  const { movementX, movementY } = event.nativeEvent;

  if (movementX || movementY) {
    props.onSuggestionHover(index);
  }
};

export const handleMouseLeave = (props) => {
  props.onSuggestionHover(null);
};
