/** @format THUNK*/
import { setStatus } from "../../actionCreators/statusActions";
import { removePlayer, updatePlayer } from "../../actionCreators/playersActions";
import { clearSelectedPlayer, setSelectedPlayer } from "../../actionCreators/selectedPlayerActions";
import { REQ_STATUS } from "../../constants";

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */
export const deleteSelectedPlayer = () => {
    return async (dispatch, getState) => {
      const { selectedPlayer } = getState();
      console.log(selectedPlayer);
  
      if (!selectedPlayer) return;
  
      dispatch(setStatus(REQ_STATUS.loading));
  
      try {
        const response = await fetch(`http://localhost:3001/api/players/${selectedPlayer.id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) throw new Error("Failed to delete player");
  
        dispatch(setStatus(REQ_STATUS.success));
        dispatch(removePlayer(selectedPlayer.id));
        dispatch(clearSelectedPlayer());
      } catch (error) {
        dispatch(setStatus(REQ_STATUS.error));
        console.error("Error deleting player:", error);
      }
    };
  };

/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (isActive) => {
    return async (dispatch, getState) => {
      const { selectedPlayer } = getState();
  
      if (!selectedPlayer) return;
  
      const updatedPlayer = { ...selectedPlayer, isActive };
  
      dispatch(setStatus(REQ_STATUS.loading));
  
      try {
        const response = await fetch(`http://localhost:3001/api/players/${selectedPlayer.id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPlayer),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update player");
        }
  
        dispatch(setStatus(REQ_STATUS.success));
        dispatch(updatePlayer(updatedPlayer));
        dispatch(clearSelectedPlayer());
      } catch (error) {
        console.error("Error updating player:", error);
        dispatch(setStatus(REQ_STATUS.error));
      }
    };
  };
  