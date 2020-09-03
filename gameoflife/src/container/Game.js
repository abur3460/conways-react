import React, { Component } from "react";
// components
import Header from "./components/Header";
import Grid from "./components/Grid";
import Settings from "./components/Settings";
import { genBlankGrid, genNextGrid, genRandomGrid } from "./models/life.js";

var presets = require("./presets/presets.json");

class Game extends Component {
  constructor(props) {
    super(props);
    const startGrid = genBlankGrid();

    this.state = {
      startGrid: startGrid,
      savedGrids: [],
      saveGridName: "",
      setSelection: null,
      cycles: 50,
      currentCycle: 50,
      speed: 5,
      currentGrid: startGrid,
      play: false,
      mouseDown: false,
      modal: true,
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

  setSpeedValue = (e) => {
    this.setState({ speed: e.target.value });
  };

  setSelection = (e) => {
    this.setState({ setSelection: e.target.value }, () =>
      console.log(this.state.setSelection)
    );
  };

  saveGridAs = (e) => {
    this.setState({ saveGridName: e.target.value });
  };

  setRandomGrid = () => {
    const randomGrid = genRandomGrid();
    this.setState({ currentGrid: randomGrid });
  };

  start = () => {
    if (this.state.currentCycle === 0)
      this.setState({ currentCycle: this.state.cycles });
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

  setPreset = (preset) => {
    var loadedPreset = presets.presets[preset];
    this.setState({ currentGrid: loadedPreset });
  };

  loadSaved = () => {
    if (this.state.play === true) {
      alert("Game must be paused before loading grid");
      return;
    } else {
      if (this.state.setSelection === null) {
        alert("Please choose a layout");
      } else {
        var grids = JSON.parse(localStorage.getItem("savedGrids"));
        grids = grids.slice(2);
        console.log(grids);
        var grid = grids.find((x) => x.gridName === this.state.setSelection);
        this.setState({ currentGrid: grid.grid });
      }
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

  nextLife = () => {
    this.lifecycle();
    this.setState({ currentCycle: this.state.currentCycle - 1 });
  };

  clearSaved = () => {
    localStorage.clear();
    console.log("Cleared saved layouts...");
  };

  componentDidMount = () => {
    const retrievedData = window.localStorage.getItem("savedGrids");
    const savedGrids = JSON.parse(retrievedData);
    if (window.localStorage.length === 0) {
      console.log(this.state.savedGrids);
      const gridToSave = {
        gridName: "Default",
        grid: genBlankGrid(),
      };
      this.setState({ savedGrids: gridToSave });
      localStorage.setItem("savedGrids", JSON.stringify(this.state.savedGrids));
      window.location.reload();
    }
  };

  componentDidUpdate = () => {
    localStorage.setItem("savedGrids", JSON.stringify(this.state.savedGrids));
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const controls = {
      cycles: this.setCycle,
      saveGridAs: this.saveGridAs,
      setSelection: this.setSelection,
      startGame: this.start,
      pauseGame: this.pause,
      resetGame: this.resetGame,
      loadSaved: this.loadSaved,
      saveGrid: this.saveGrid,
      clearSaved: this.clearSaved,
      setSpeedValue: this.setSpeedValue,
      nextLife: this.nextLife,
    };

    return (
      <main>
        {this.state.modal ? (
          <div className="welcome-modal">
            <h1>Welcome to Conway's Game of Life</h1>
            <div className="info-wrapper">
              <div className="left">
                <div className="title">Rules</div>

                <p className="rule">
                  Any live cell with two or three live neighbours survives
                </p>
                <p className="rule">
                  Any dead cell with three live neighbours becomes a live cell.
                </p>
                <p className="rule">
                  All other live cells die in the next generation. Similarly,
                  all other dead cells stay dead.
                </p>
              </div>
              <div className="right">
                <div className="title">About</div>
                <p className="info">
                  Conway's Game of Life was invented in 1970 by British
                  mathematician John Horton Conway.
                </p>
                <p className="info">
                  To interact with the Game of Life, one sets a configuration of
                  alive and dead cells on a grid and observes how it evolves.
                </p>
                <p className="info">
                  This rendition includes a few premade patterns to enjoy, as
                  well as a randomizer for quick simulations.
                </p>
              </div>
            </div>
            <span
              className="btn"
              onClick={() => {
                this.hideModal();
              }}
            >
              Get Started
            </span>
          </div>
        ) : null}
        <div
          className="main-wrapper"
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
        >
          <div className="left">
            <Grid
              grid={this.state.currentGrid}
              toggle={this.toggleCell}
              mouseOver={this.mouseOver}
            />
          </div>
          <div className="center">
            <h3>Presets</h3>
            <div className="presets">
              <div
                className="preset gun"
                onClick={() => {
                  this.setPreset(0);
                }}
              ></div>
              <div
                className="preset face"
                onClick={() => {
                  this.setPreset(1);
                }}
              ></div>
              <div
                className="preset swords"
                onClick={() => {
                  this.setPreset(2);
                }}
              ></div>
              <div
                className="preset glider"
                onClick={() => {
                  this.setPreset(3);
                }}
              ></div>
            </div>
          </div>
          <div className="right">
            <Header settingsCallback={this.settingsCallback} />
            <div
              className="random"
              onClick={() => {
                this.setRandomGrid();
              }}
            >
              Generate Random Grid
            </div>
            <p className="current-cycle">
              Current Lifecycle: {this.state.currentCycle}
            </p>

            <Settings
              settings={this.settingsCallback}
              cycleCount={this.state.cycles}
              saveGridAs={this.state.saveGridName}
              savedGrids={this.state.savedGrids}
              cycles={this.state.cycles}
              callBacks={controls}
              speedValue={this.state.speed}
            />
          </div>
        </div>
      </main>
    );
  }
}
export default Game;
