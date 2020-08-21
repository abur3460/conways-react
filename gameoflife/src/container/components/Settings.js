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
  } = props.callBacks;

  const { cycleValue, saveGridAsValue, savedGrids, gridSize } = props;

  const options = savedGrids.slice(1).map((savedGrid, index) => {
    return (
      <option value={savedGrid.gridName} key={`sg${index}`}>
        {savedGrid.gridName}
      </option>
    );
  });

  const defaultOption = (
    <option value={null} key={`sgDefault`}>
      Select a grid
    </option>
  );
  options.unshift(defaultOption);
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
          <label htmlFor="cycles">Cycles: </label>
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
          <label htmlFor="saved-grid">Choose a saved layout</label>
          <select className="setting" name="saved-grid" onChange={setSelection}>
            {options}
          </select>
          <button className="setting btn" onClick={loadSaved}>
            Load
          </button>
        </div>

        <div className="setting-wrapper">
          <label htmlFor="save-grid-name">Layout Name: </label>
          <input
            type="text"
            className="setting"
            name="save-grid-name"
            value={saveGridAsValue}
            onChange={saveGridAs}
          />
          <button className="setting btn" onClick={saveGrid}>
            Save
          </button>
          <button className="setting btn" onClick={clearSaved}>
            Clear Saved Layouts
          </button>
        </div>
      </div>
      <div className="bottom">
        <span className="setting btn start" onClick={startGame}>
          Start
        </span>
        <span className="setting btn pause" onClick={pauseGame}>
          Pause
        </span>
        <span className="setting btn reset" onClick={resetGame}>
          Reset
        </span>
      </div>
    </nav>
  );
};
export default Settings;
