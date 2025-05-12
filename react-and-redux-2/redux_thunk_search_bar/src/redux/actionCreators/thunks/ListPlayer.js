/** @format THUNK*/
import { setStatus } from "../statusActions";
import { setSelectedPlayer } from "../selectedPlayerActions";
import { REQ_STATUS } from "../../../../cypress/e2e/constants";

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
      dispatch(setStatus(REQ_STATUS.loading));
  
      try {
        const response = await fetch(`http://localhost:3001/api/players/${id}`);
        if (!response.ok) throw new Error("Failed to fetch player data");
  
        const data = await response.json();
  
        dispatch(setStatus(REQ_STATUS.success));
        dispatch(setSelectedPlayer(data));
      } catch (error) {
        dispatch(setStatus(REQ_STATUS.error));
        console.error("Error fetching player:", error);
      }
    };
  };
