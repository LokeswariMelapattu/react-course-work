/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteSelectedPlayer, updateSelectedPlayer } from "../redux/actionCreators/thunks/SelectedPlayer";

export const SelectedPlayer = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.selectedPlayer);
  
  const [isChecked, setIsChecked] = useState(player?.isActive || false);

  useEffect(() => {
    if (player) {
      setIsChecked(player.isActive); 
    }
  }, [player]);
  
  if (!player || Object.keys(player).length === 0) {
    return <div>No player selected</div>;
  }

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleUpdate = () => {
    dispatch(updateSelectedPlayer(isChecked));
  };

  const handleDelete = () => {
    dispatch(deleteSelectedPlayer());
  };

  return (
    <div id="selected-player">
      <p>Selected Player</p>
      <p id="player-name">{player.name}</p>

      <label id="checkbox-label">
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="player-status"
        />
        <span className="checkmark"></span>
        <p id="player-status">{player.isActive ? "active" : "inactive"}</p>
      </label>

      <button
        className="btn-update"
        disabled={isChecked === player.isActive} 
        onClick={handleUpdate}
      >
        Update
      </button>

      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};