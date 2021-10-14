//trace mouse move on an item in suggestions list and call onSuggestionHover
export const handleMouseMove = ({ event, index, props }) => {
  const { movementX, movementY } = event.nativeEvent;

  if (movementX || movementY) {
    props.onSuggestionHover(index);
  }
};

//handle mouse leave an item in suggestions list and call onSuggestionHover
export const handleMouseLeave = (props) => {
  props.onSuggestionHover(null);
};
