import React, { Component } from "react";

// components
import Header from "./components/Header";
import Controls from "./components/Controls";
import Grid from "./components/Grid";
import Modal from "./components/Modal";
import life from "./models/life";

class Game extends Component {
  constructor(props) {
    super(props);

    const startGrid = life.genBlankGrid();

    this.state = {
      savedGrids: [],
      saveGridName: "",
      selectionLocation: null,
      cycles: 50,
      currentGrid: startGrid,
      play: false,
      mouseDown: false,
      about: false,
      rules: false,
      settings: false,
    };
  }

  settingsCallback = () => {
    this.setState((prevState) => {
      const settingsState = !prevState.settings;
      return { settings: settingsState };
    });
  };

  lifecycle = () => {
    console.time("renderNewGrid");
    this.setState(
      (prevState, props) => {
        const newGrid = life.genNextGrid(prevState.currentGrid);
        return { currentGrid: newGrid };
      },
      () => console.timeEnd("renderNewGrid")
    );
  };

  toggleCell = (row, column) => () => {
    if (this.state.play === false) {
      this.setState((state) => {
        const newGrid = [...state.currentGrid];
        const cell = newGrid[row][column];

        newGrid[row][column] = cell === true ? false : true;

        return newGrid;
      });
    }
  };

  mouseOver = (row, column) => () => {
    if (this.state.mouseDown) this.toggle(row, column)();
  };

  mouseDown = () => {
    this.setState({ mouseDown: true });
  };

  mouseUp = () => {
    this.setState({ mouseDown: false });
  };

  setCycle = (e) => {
    this.setState({ cycles: e.target.value });
  };

  setSelection = (e) => {
    this.setState({ selectionLocation: e.target.value }, () =>
      console.log(this.state.selectionLocation)
    );
  };

  saveGridAs = (e) => {
    this.setState({ saveGridName: e.target.value });
  };

  start = () => {
    console.log("Starting game...");
    this.setState({ play: true });
    const id = setInterval(() => {
      console.log("lifecycles: ", this.state.cycles);
      console.time("cycle");
      if (this.state.cycles > 0 && this.state.play == true) {
        this.cycle();
        const newCycles = this.state.cycles - 1;
        this.setState({ cycles: newCycles }, () => console.timeEnd("cycle"));
      } else {
        if (this.state.play === true) this.setState({ play: false });
        clearInterval(id);
      }
    }, 500);
  };

  pause = () => {
    this.setState({ play: false });
  };

  resetGame = () => {
    this.setState({ play: false, currentGrid: life.genBlankGrid() });
  };

  loadSaved = () => {
    if (this.state.play == true) {
      alert("Game must be paused before loading grid");
      return;
    } else {
      console.log(this.state.selectionLocation);
      this.setState((prevState, props) => {
        const selectGrid = prevState.selectionLocation;
        const selectedGrid = prevState.savedGrids[selectGrid];
        return { currentGrid: selectedGrid.grid };
      });
    }
  };

  saveGrid = () => {
    if (this.state.play === true) {
      alert("Game must be paused to save grid.");
      return;
    } else {
      this.setState((prevState, props) => {
        const gridToSave = {
          gridName: prevState.saveGridAs,
          grid: currentGrid,
        };
        const savedGrids = prevState.savedGrids;
        const newSavedGrids = [].concat(savedGrids, gridToSave);
        return { savedGrids: newSavedGrids };
      });
    }
  };

  componentDidMount = () => {
    const savedGrids = JSON.parse(localStorage.getItem("savedGrids"));
    this.setState({ savedGrids: savedGrids }, () =>
      console.log(this.state.savedGrids)
    );
  };

  componentDidUpdate = () => {
    localStorage.setItem("savedGrids", JSON.stringify(this.state.savedGrids));
  };

  render() {
    const controls = {
      cycles: this.setCycle,
      saveGridAs: this.saveGridAs,
      selectionLocation: this.setSelection,
      startGame: this.start,
      pauseGame: this.pause,
      resetGame: this.reset,
      loadGrid: this.loadSaved,
      saveGrid: this.saveGrid,
    };

    return (
      <div
        className="main-wrapper"
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
      >
        <Header />
        <Controls />
        <Grid />
        <Modal />
      </div>
    );
  }
}
export default Game;
