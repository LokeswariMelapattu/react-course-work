import { REQ_STATUS } from "../../../../cypress/e2e/constants.js";  // Assuming REQ_STATUS is imported from here
import { removePlayer, updatePlayer } from "../../actionCreators/playersActions";  // Assuming actions are imported
import { clearSelectedPlayer, setSelectedPlayer } from "../../actionCreators/selectedPlayerActions";  // Assuming actions are imported
import { setStatus } from "../../actionCreators/statusActions";  // Assuming actions are imported

const url = "http://localhost:3001/api/players";  // Assuming this is the correct API endpoint

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */
export const deleteSelectedPlayer = () => {
  return async (dispatch, getState) => {
    const selectedPlayer = getState().selectedPlayer;  // Get the currently selected player from the Redux store

    if (!selectedPlayer || !selectedPlayer.id) {
      console.error("No selected player to delete");
      return;
    }

    try {
      // Dispatch loading status
      dispatch(setStatus(REQ_STATUS.loading));

      // Send DELETE request to remove the player
      const response = await fetch(`${url}/${selectedPlayer.id}`, {
        method: 'DELETE',
      });

      // Check if the request was successful
      if (!response.ok) {
        // Dispatch error status if the request fails
        dispatch(setStatus(REQ_STATUS.error));
        throw new Error("Failed to delete player");
      }

      // Dispatch success status
      dispatch(setStatus(REQ_STATUS.success));

      // Dispatch actions to remove the player from the store
      dispatch(removePlayer(selectedPlayer.id));

      // Clear the selected player from the store
      dispatch(clearSelectedPlayer());
    } catch (error) {
      // Dispatch error status if there was an issue with the request
      dispatch(setStatus(REQ_STATUS.error));
      console.error(error);
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

export const updateSelectedPlayer = (updatedActivity) => {
    return async (dispatch, getState) => {
      const selectedPlayer = getState().selectedPlayer;  
  
      if (!selectedPlayer || !selectedPlayer.id) {
        console.error("No selected player to update");
        return;
      }
  
      try {
        // Dispatch loading status
        dispatch(setStatus(REQ_STATUS.loading));
  
        const updatedPlayer = { ...selectedPlayer, isActive: updatedActivity };
         //setSelectedPlayer(updatedPlayer);
  
        // Send PUT request to update the player's status
        const response = await fetch(`${url}/${selectedPlayer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPlayer),
        });
  
        if (!response.ok) {
         // dispatch(setStatus(REQ_STATUS.error));
          throw new Error("Failed to update player");
        }
   // Dispatch success status
        dispatch(setStatus(REQ_STATUS.success));
  
        // Dispatch action to update the player in the store
        dispatch(updatePlayer(updatedPlayer));
   
         // Clear the selected player
         dispatch(clearSelectedPlayer());
      } catch (error) {
        dispatch(setStatus(REQ_STATUS.error));
        console.error(error);
      }
    };
  };