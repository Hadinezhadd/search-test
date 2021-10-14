export const handleClick = (props) => {
  props.onClick(props.suggestion);
};

export const handleMouseMove = ({ event, props }) => {
  props.onMouseMove(event, props.index);
};
