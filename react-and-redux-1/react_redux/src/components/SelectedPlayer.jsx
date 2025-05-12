/** @format */

/** @format
 * @description
 * Student instructions:
 * Copy contents for this file from the react_fetch exercise of the react week.
 *
 * BEWARE: No props are passed to this component from now on. Instead, the selectedPlayer is fetched from the redux store.

 */

import { useSelector } from "react-redux"; 
export const SelectedPlayer = () => {
  // Get the request status from the Redux store
      const player = useSelector((state) => state.selectedPlayer); // Assuming `status` is the key in your Redux store
   
   
    if (!player || Object.keys(player).length === 0) {
      return null; 
     }
  
  return ( 
    <div id="selected-player">
      <h3>Selected Player</h3>
      <p id="player-name">{player.name}</p>
      <p id="player-status">
        {player?.isActive ? "active" : "inactive"}
      </p>
    </div>
  );
};
