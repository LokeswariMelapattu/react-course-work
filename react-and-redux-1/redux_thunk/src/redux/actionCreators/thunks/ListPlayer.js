import { REQ_STATUS } from "../../../../cypress/e2e/constants.js";  // Assuming REQ_STATUS is imported from here
import { setStatus } from "../../actionCreators/statusActions";  // Assuming these actions are imported
import { setSelectedPlayer } from "../../actionCreators/selectedPlayerActions";  // Assuming these actions are imported

const url = "http://localhost:3001/api/players";  // Assuming this is the correct API endpoint

/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Number | String} id - id of the player
 * @return {Function} - thunk
 */
export const getSelectedPlayer = (id) => {
  return async (dispatch) => {
    try { 
      // Dispatch loading status
      dispatch(setStatus(REQ_STATUS.loading));
       
      // Make the API request to get the selected player
      const response = await fetch(`${url}/${id}`);

      // Check if the request was successful
      if (!response.ok) { 
        throw new Error("Failed to get selected player");
      }

      // Parse the response data
      const data = await response.json();

      // Dispatch success status
      dispatch(setStatus(REQ_STATUS.success));

      // Dispatch setSelectedPlayer action with the fetched player data
      dispatch(setSelectedPlayer(data));
    } catch (error) {
      // Dispatch error status if there was an issue with the request
      dispatch(setStatus(REQ_STATUS.error));
      console.error(error);
    }
  };
};
