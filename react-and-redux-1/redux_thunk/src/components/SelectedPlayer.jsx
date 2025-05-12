/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedPlayer, updateSelectedPlayer } from "../redux/actionCreators/thunks/SelectedPlayer";

export const SelectedPlayer = () => {
  const player = useSelector((state) => state.selectedPlayer); // Get selected player from Redux store


  const dispatch = useDispatch();
  const [playerStatus, setPlayerStatus] = useState(player?.isActive);
  const [isUpdated, setIsUpdated] = useState(false);
  
  // Sync local state with Redux when player updates
  useEffect(() => {
    setPlayerStatus(player?.isActive);
    setIsUpdated(false);
  }, [player]);

  const handleUpdateClick = () => {
    if (isUpdated) {
      dispatch(updateSelectedPlayer(playerStatus));
      setIsUpdated(false);
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteSelectedPlayer());
  };

  const handleCheckboxChange = () => {
    const updatedStatus = !playerStatus;
    setPlayerStatus(updatedStatus);
    setIsUpdated(updatedStatus != player?.isActive);  
  };
  if (player == null || Object.keys(player).length === 0) {
    return null; 
     }
  return (
    <div id="selected-player">
      <h3>Selected Player</h3>
      <p id="player-name">{player.name}</p>

      <label id="checkbox-label">
        <span id="player-status" className="player-status">{playerStatus ? "active" : "inactive"}</span>
        <input 
          id="checkbox"
          type="checkbox"
          className="player-status"
          checked={playerStatus}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark" />
      </label>

      <button className="btn-update" onClick={handleUpdateClick} disabled={!isUpdated}>
        Update
      </button>
      <button className="btn-delete" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

