import React from "react";

const Cell = (props) => {
  const column = props.columnNum;
  const row = props.rowNum;

  return (
    <div
      className={`cellDiv ${props.isAwake ? "awake" : "asleep"}`}
      onClick={props.toggle(row, column)}
      onMouseOver={props.mouseOver(row, column)}
    ></div>
  );
};

export default Cell;
