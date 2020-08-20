import React, { Component } from "react";

// components
import Header from "./components/Header";
import Grid from "./components/Grid";
import Settings from "./components/Settings";
import { genBlankGrid, genNextGrid } from "./models/life.js";

class Game extends Component {
  constructor(props) {
    super(props);
    const startGrid = genBlankGrid();

    this.state = {
      savedGrids: [],
      saveGridName: "",
      selectionLocation: null,
      cycles: 50,
      currentCycle: 50,
      speed: 5,
      currentGrid: startGrid,
      play: false,
      mouseDown: false,
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
        const newGrid = genNextGrid(prevState.currentGrid);
        return {
          currentGrid: newGrid,
          cycleCounter: this.state.currentCycle - 1,
        };
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
    if (this.state.mouseDown) this.toggleCell(row, column)();
  };

  mouseDown = () => {
    this.setState({ mouseDown: true });
  };

  mouseUp = () => {
    this.setState({ mouseDown: false });
  };

  setCycle = (e) => {
    this.setState({ cycles: e.target.value, currentCycle: e.target.value });
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
    this.setState({ play: true, cycleCounter: this.state.cycles });
    const id = setInterval(() => {
      console.log("lifecycle: ", this.state.cycleCounter);
      console.time("cycle");
      if (this.state.cycleCounter > 0 && this.state.play === true) {
        this.lifecycle();
        const newCycles = this.state.cycleCounter;
        this.setState({ currentCycle: newCycles }, () =>
          console.timeEnd("cycle")
        );
      } else {
        if (this.state.play === true) this.setState({ play: false });
        clearInterval(id);
      }
    }, this.state.speed);
  };

  pause = () => {
    this.setState({ play: false });
  };

  resetGame = () => {
    this.setState({
      play: false,
      currentGrid: genBlankGrid(),
      currentCycle: this.state.cycles,
    });
  };

  loadSaved = () => {
    if (this.state.play === true) {
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
      if (this.state.saveGridName === "") {
        alert("Please enter a name");
      } else {
        this.setState((prevState, props) => {
          const gridToSave = {
            gridName: prevState.saveGridName,
            grid: this.state.currentGrid,
          };
          const savedGrids = prevState.savedGrids;
          const newSavedGrids = [].concat(savedGrids, gridToSave);
          console.log(`Saved grid as: ${this.state.saveGridName}`);
          return { savedGrids: newSavedGrids };
        });
      }
    }
  };

  clearSaved = () => {
    localStorage.clear();
    return console.log("Cleared saved layouts...");
  };

  componentDidMount = () => {
    const retrievedData = localStorage.getItem("savedGrids");
    const savedGrids = JSON.parse(retrievedData);
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
      setSelection: this.setSelection,
      startGame: this.start,
      pauseGame: this.pause,
      resetGame: this.resetGame,
      loadGrid: this.loadSaved,
      saveGrid: this.saveGrid,
      clearSaved: this.clearSaved,
    };

    return (
      <div
        className="main-wrapper"
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
      >
        <div className="one">
          <Grid
            grid={this.state.currentGrid}
            toggle={this.toggleCell}
            mouseOver={this.mouseOver}
          />
        </div>
        <div className="two">
          <Header settingsCallback={this.settingsCallback} />
          <div className="modal-toggle-wrapper">
            <button>Settings</button>
          </div>
        </div>
        <Settings
          settings={this.settingsCallback}
          cycleCount={this.state.cycles}
          saveGridAs={this.state.saveGridName}
          savedGrids={this.state.savedGrids}
          cycles={this.state.cycles}
          callBacks={controls}
        />
      </div>
    );
  }
}
export default Game;
