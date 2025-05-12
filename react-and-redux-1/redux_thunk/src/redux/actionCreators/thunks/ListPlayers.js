import { REQ_STATUS } from "../../../../cypress/e2e/constants.js"; // Assuming REQ_STATUS is imported from here
import { setStatus } from "../../actionCreators/statusActions";  // Assuming these actions are imported
import { setPlayers } from "../../actionCreators/playersActions";  // Assuming these actions are imported

const url = "http://localhost:3001/api/players";  // Assuming this is the correct API endpoint

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */
export const getPlayers = () => {
  return async (dispatch) => {
    try {
      // Dispatch loading status
      dispatch(setStatus(REQ_STATUS.loading));

      // Make the API request to get the list of players
      const response = await fetch(url);

      // Check if the request was successful
      if (!response.ok) {
        // Dispatch error status if the request fails
        dispatch(setStatus(REQ_STATUS.error));
        throw new Error("Failed to get players");
      }

      // Parse the response data
      const data = await response.json();

      // Dispatch success status
      dispatch(setStatus(REQ_STATUS.success));

      // Dispatch setPlayers action with the fetched players data
      dispatch(setPlayers(data));
    } catch (error) {
      // Dispatch error status if there was an issue with the request
      dispatch(setStatus(REQ_STATUS.error));
      console.error(error);
    }
  };
};
