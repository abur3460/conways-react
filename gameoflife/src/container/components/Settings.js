import React from "react";

const Settings = (props) => {
  const {
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

  const { cycleValue, saveGridAsValue, savedGrids } = props;

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
          <label htmlFor="cycles">Cycles: </label>
          <input
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
        <button className="setting btn" onClick={startGame}>
          Start
        </button>
        <button className="setting btn" onClick={pauseGame}>
          Pause
        </button>

        <button className="setting btn" onClick={resetGame}>
          Reset
        </button>
      </div>
    </nav>
  );
};
export default Settings;
