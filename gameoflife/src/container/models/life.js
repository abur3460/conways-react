export function genBlankGrid(xLength = 50, yLength = 50) {
  const rowMaker = () => {
    const cellMaker = () => false;
    const row = Array.from({ length: xLength }, cellMaker);
    return row;
  };
  const blankGrid = Array.from({ length: yLength }, rowMaker);
  return blankGrid;
}

function getNeighbors(currentGrid) {
  const neighborGrid = currentGrid.map(function (row, rowIndex, grid) {
    return row.map(function (cell, cellIndex, row) {
      var neighbors = 0;
      if (rowIndex !== 0) {
        // get above neighbors if not on top row
        if (grid[rowIndex - 1][cellIndex - 1]) {
          neighbors += 1;
        }
        if (grid[rowIndex - 1][cellIndex]) {
          neighbors += 1;
        }
        if (grid[rowIndex - 1][cellIndex + 1]) {
          neighbors += 1;
        }
      }
      // get neighbors to sides
      if (grid[rowIndex][cellIndex - 1]) {
        neighbors += 1;
      }
      if (grid[rowIndex][cellIndex + 1]) {
        neighbors += 1;
      }
      if (rowIndex !== grid.length - 1) {
        // get below neighbors if not on bottom row
        if (grid[rowIndex + 1][cellIndex - 1]) {
          neighbors += 1;
        }
        if (grid[rowIndex + 1][cellIndex]) {
          neighbors += 1;
        }
        if (grid[rowIndex + 1][cellIndex + 1]) {
          neighbors += 1;
        }
      }
      return neighbors;
    });
  });
  return neighborGrid;
}

function genNewGrid(currentGrid, neighborGrid) {
  const newGrid = currentGrid.map(function (row, rowNum, grid) {
    return row.map(function (cell, cellNum, row) {
      const alive = cell;
      const neighbors = neighborGrid[rowNum][cellNum];
      if (neighbors < 2) {
        return false;
      } else if (neighbors === 2 && alive) {
        return true;
      } else if (neighbors === 3 && alive) {
        return true;
      } else if (neighbors === 3 && !alive) {
        return true;
      } else if (neighbors === 0 && !alive) {
        return true;
      } else if (neighbors > 3) {
        return false;
      } else {
        return false;
      }
    });
  });
  return newGrid;
}

export function genNextGrid(grid) {
  let neighborGrid = getNeighbors(grid);
  return genNewGrid(grid, neighborGrid);
}
