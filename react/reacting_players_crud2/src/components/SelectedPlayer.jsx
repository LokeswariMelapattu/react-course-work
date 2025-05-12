/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import React, { useState, useEffect } from "react";

export const SelectedPlayer = ({ player, handleUpdate, handleDelete }) => {
  if (!player) return null;  // Don't render anything if player is null

  const [playerStatus, setPlayerStatus] = useState(player.isActive); 
  const [isUpdated, setIsUpdated] = useState(false);  // Track if status is updated 
   
  // // Update playerStatus whenever player.isActive changes
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
    console.log(`before playerstatus:${playerStatus}`);
    console.log(`before updatedStatus:${updatedStatus}`);
    setPlayerStatus(updatedStatus); 
    const elem =document.getElementById("checkbox");
    console.log(elem);
    console.log(`after playerstatus:${playerStatus}`);
    setIsUpdated(updatedStatus != player.isActive);  
     
   
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
