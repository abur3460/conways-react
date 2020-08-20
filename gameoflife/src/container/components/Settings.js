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
      <label htmlFor="cycles">Cycles: </label>
      <input
        type="number"
        className="setting"
        name="cycles"
        onChange={cycles}
        value={cycleValue}
      />

      <button className="setting btn" onClick={startGame}>
        Start
      </button>
      <button className="setting btn" onClick={pauseGame}>
        Pause
      </button>

      <button className="setting btn" onClick={resetGame}>
        Reset
      </button>

      <label htmlFor="saved-grid">Choose a saved layout</label>
      <select className="setting" name="saved-grid" onChange={setSelection}>
        {options}
      </select>
      <button className="setting btn" onClick={loadSaved}>
        Load
      </button>

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
      <label htmlFor="clear">Clear Saved Layouts</label>
      <input
        type="button"
        className="setting"
        name="clear"
        onClick={clearSaved}
      />
    </nav>
  );
};
export default Settings;
