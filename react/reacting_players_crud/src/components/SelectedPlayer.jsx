/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
 */
import React, { useState, useEffect } from "react";

export const SelectedPlayer = ({ player, handleUpdate, handleDelete }) => {
  if (!player) return null;  // Don't render anything if player is null

  const [playerStatus, setPlayerStatus] = useState(player.isActive); 
  const [isUpdated, setIsUpdated] = useState(false);  // Track if status is updated


  // Update playerStatus whenever player.isActive changes
  useEffect(() => {
    setPlayerStatus(player.isActive);
  }, [player.isActive]); // This effect runs only when player.isActive changes

  const handleUpdateClick = () => {
    console.log('update'); 
    // Only trigger update if there is a change in player status
    if (handleUpdate && playerStatus !== player.isActive) { 
      setIsUpdated(false);
      handleUpdate(playerStatus);  
    }
  };

  const handleDeleteClick = () => {
    if (handleDelete) {
      handleDelete(player.id);  
    }
  };

  const handleCheckboxChange = () => { 
    // Update the player status and trigger parent update function
      
    console.log('a');
    const updatedStatus = !playerStatus;
    setPlayerStatus(updatedStatus); 
    if(updatedStatus != player.isActive)
      {
        setIsUpdated(true);
        console.log('updated');
      }
      else{
        setIsUpdated(false);
        console.log('not updated');
      }
      // Manually update the 'checked' attribute using setAttribute
      const checkbox = document.getElementById('checkbox');
      checkbox.setAttribute('checked', updatedStatus); // This sets the 'checked' attribute
  };

  return (
    <div id="selected-player">
      <h3>Selected Player</h3>
      <p id="player-name">{player.name}</p>
     
      
      <label id="checkbox-label">
      <span id="player-status">{playerStatus ? "active" : "inactive"}</span>
        <input
          type="checkbox"
          id="checkbox"
          className="player-status"
          checked={playerStatus}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark" />
      </label>

      <button className="btn-update" onClick={handleUpdateClick}
        disabled={!isUpdated} 
        >Update</button>
      <button className="btn-delete" onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};
