//handle click on an item in suggestions list
export const handleClick = (props) => {
  props.onClick(props.suggestion);
};

//trace mouse move on an item in suggestions list
export const handleMouseMove = ({ event, props }) => {
  props.onMouseMove(event, props.index);
};
