import React from "react";

const Settings = (props) => {
  const {
    cycles,
    saveGridAs,
    setSelection,
    startGame,
    pauseGame,
    resetGame,
    loadGrid,
    saveGrid,
    clearSaved,
  } = props.callBacks;

  const { cycleValue, saveGridAsValue, savedGrids = false } = props;

  const options = !savedGrids
    ? []
    : savedGrids.map((savedGrid, index) => {
        return (
          <option value={index} key={`sg${index}`}>
            {savedGrids.saveGridName}
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
    <div className="modal-wrapper">
      <nav className="settings-modal">
        <label htmlFor="cycles">Cycles: </label>
        <input
          type="number"
          className="setting"
          name="cycles"
          onChange={cycles}
          value={cycleValue}
        />
        <label htmlFor="Start">Start</label>
        <input
          type="button"
          className="setting"
          name="start"
          onClick={startGame}
        />

        <label htmlFor="pause">Pause</label>
        <input
          type="button"
          className="setting"
          name="pause"
          onClick={pauseGame}
        />

        <label htmlFor="reset">Reset Grid</label>
        <input
          type="button"
          className="setting"
          name="reset"
          onClick={resetGame}
        />

        <label htmlFor="saved-grid">Choose a saved layout</label>
        <select className="setting" name="saved-grid" onChange={setSelection}>
          {options}
        </select>
        <label htmlFor="load-grid">Load Layout</label>
        <input
          type="button"
          className="setting"
          name="load-grid"
          onChange={loadGrid}
        />

        <label htmlFor="save-grid-name">Layout Name: </label>
        <input
          type="text"
          className="setting"
          name="save-grid-name"
          value={saveGridAsValue}
          onChange={saveGridAs}
        />
        <label htmlFor="save-grid-btn">Save Layout</label>
        <input
          type="button"
          className="setting"
          name="save-grid-btn"
          onClick={saveGrid}
        />
        <label htmlFor="clear">Clear Saved Layouts</label>
        <input
          type="button"
          className="setting"
          name="clear"
          onClick={clearSaved}
        />
      </nav>
    </div>
  );
};
export default Settings;
