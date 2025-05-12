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
  const player = useSelector((state) => state.selectedPlayer);

  if (!player || Object.keys(player).length === 0) {
    return <div>No player selected</div>;
  }
  else{
    return (
      <div>
      <div id="selected-player">
        <h3>Selected Player</h3>
        <p id="player-name">{player.name}</p>
        <p id="player-status">{player.isActive ? "active" : "inactive"}</p>
      </div>
    </div>
    )
  }
};