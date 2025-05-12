 
import { REQ_STATUS } from "../../../../cypress/e2e/constants.js";  // Assuming REQ_STATUS is imported from here
import { setStatus } from "../../actionCreators/statusActions";  // Assuming these actions are imported
import { clearSelectedPlayer } from "../../actionCreators/selectedPlayerActions";  // Assuming this action is imported
import { addPlayer } from "../../actionCreators/playersActions";  // Assuming this action is imported

const url = "http://localhost:3001/api/players"; // Assuming this is the correct API endpoint

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk with dispatch as param
 */
export const postPlayer = (newPlayer) => {
  return async (dispatch) => {
    try {
      // Dispatch loading status
      dispatch(setStatus(REQ_STATUS.loading));
     
      // Make the API request to post the new player
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      // Check if the request was successful
      if (!response.ok) {
        // Dispatch error status if the request fails
        dispatch(setStatus(REQ_STATUS.error));
        throw new Error("Failed to post player");
      }

      // Parse the response data
      const data = await response.json();

      // Dispatch success status
      dispatch(setStatus(REQ_STATUS.success));

      // Dispatch addPlayer action to update the Redux store with the new player
      dispatch(addPlayer(data));

      // Dispatch clearSelectedPlayer action to clear the selected player state
      dispatch(clearSelectedPlayer());
    } catch (error) {
      // Dispatch error status if there was an issue with the request
      dispatch(setStatus(REQ_STATUS.error));
      console.error(error);
    }
  };
};
 