import React from "react";

const Settings = (props) => {
  const {
    setGridSize,
    cycles,
    saveGridAs,
    setSelection,
    startGame,
    pauseGame,
    resetGame,
    loadSaved,
    saveGrid,
    clearSaved,
    setSpeedValue,
  } = props.callBacks;

  const {
    cycleValue,
    speedValue,
    saveGridAsValue,
    savedGrids,
    gridSize,
  } = props;

  // const options = savedGrids.slice(1).map((savedGrid, index) => {
  //   return (
  //     <option value={savedGrid.gridName} key={`sg${index}`}>
  //       {savedGrid.gridName}
  //     </option>
  //   );
  // });

  // const defaultOption = (
  //   <option value={null} key={`sgDefault`}>
  //     Select a grid
  //   </option>
  // );
  // options.unshift(defaultOption);
  return (
    <nav className="settings-wrapper">
      <div className="top">
        <div className="setting-wrapper">
          {/* <label>Grid Size: </label>
          <input
            type="number"
            className="setting"
            onChange={setGridSize}
            value={gridSize}
          /> */}
        </div>
        <div className="setting-wrapper">
          <label htmlFor="cycles">Lifecycles: </label>
          <input
            placeholder="50"
            type="number"
            className="setting"
            name="cycles"
            onChange={cycles}
            value={cycleValue}
          />
        </div>
        <div className="setting-wrapper">
          <label htmlFor="speed">Lifecycle Time: </label>
          <input
            placeholder={speedValue}
            type="range"
            className="setting"
            name="speed"
            min="0"
            max="1000"
            onChange={setSpeedValue}
            value={speedValue}
          />
        </div>
        <div className="setting-wrapper">
          <label htmlFor="saved-grid">Choose a saved layout: </label>
          <div>
            <select
              className="setting"
              name="saved-grid"
              onChange={setSelection}
            >
              {/* {options} */}
            </select>
            <span className="setting btn" onClick={loadSaved}>
              Load
            </span>
          </div>
        </div>

        <div className="setting-wrapper">
          <label htmlFor="save-grid-name">Layout Name: </label>
          <div>
            <input
              type="text"
              className="name"
              name="save-grid-name"
              value={saveGridAsValue}
              onChange={saveGridAs}
            />
            <span className="setting btn" onClick={saveGrid}>
              Save
            </span>
          </div>
        </div>
        <span className="clear" onClick={clearSaved}>
          Clear Saved Layouts
        </span>
      </div>
      <div className="bottom">
        <span className="setting btn start" onClick={startGame}>
          Start
        </span>
        <span className="setting btn pause" onClick={pauseGame}>
          Pause
        </span>
        <span className="setting btn reset" onClick={resetGame}>
          Clear
        </span>
      </div>
    </nav>
  );
};
export default Settings;
