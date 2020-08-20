import React from "react";
import Row from "./Row";

const Grid = (props) => {
  const grid = props.grid;

  const rows = grid.map((row, i) => {
    return (
      <Row
        className="row"
        row={row}
        rowNum={i}
        key={`Row${i}`}
        toggle={props.toggle}
        mouseOver={props.mouseOver}
      />
    );
  });

  return (
    <main
      className="gridDiv"
      onMouseDown={props.mouseDown}
      onMouseUp={props.mouseUp}
    >
      {rows}
    </main>
  );
};
export default Grid;
