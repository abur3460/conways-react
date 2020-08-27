# Welcome to Conway's Game of Life

## Rules

1. Any live cell with two or three live neighbours survives.

2. Any dead cell with three live neighbours becomes a live cell.

3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Building the App

### The main entry point of the application houses the visualization of this cellular automaton. This includes necessary components, such as

1. Grid to display cells.
2. Cell objects or components that, at a minimum, should have:
   - Properties
     - current state: (alive, dead), (black, white)
     - Clickable/Tappable:
       - can be clicked to allow user to setup initial cell configuration
       - should NOT be clickable while simulation is running
     - Behaviors
       - Toggle state functionality: switch between alive & dead either because user manually toggled cell before starting simulation or simulation is 2. running and rules of life caused cell to change state
3. An appropriate data structure to hold a grid of cells that is at least 25x25. Go as big as you want.
4. Text to display current generation # being displayed
   - Utilize a timeout function to build the next generation of cells & update the display at the chosen time interval
5. Button(s) that start & stop the animation
6. Button to clear the grid

### Using an algorithm that

1. Implements the following basic steps:
   - For each cell in the current generation's grid:
     - Examine state of all eight neighbors (it's up to you whether you want cells to wrap around the grid and consider cells on the other side or not)
     - Apply rules of life to determine if this cell will change states
     - When main loop completes:
       - Swap current and next grids
       - Repeat until simulation stopped
2. Breaks down above steps into appropriate sub-tasks implemented with helper functions to improve readability
3. Uses double buffering to update grid with next generation.
4. Does something well-documented with the edge of the grid. (e.g. wrap around to the far side--most fun!--or assumes all edge cells are permanently dead.)
