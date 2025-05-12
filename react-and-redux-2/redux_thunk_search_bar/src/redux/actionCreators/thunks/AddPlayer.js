/** @format THUNK*/

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
import { addPlayer } from "../playersActions";
import { setStatus } from "../statusActions";
import { REQ_STATUS} from "../../constants"
import { clearSelectedPlayer } from "../selectedPlayerActions";

export const postPlayer = (player) => async (dispatch) => {
  try {
    dispatch(setStatus(REQ_STATUS.loading));
    const response = await fetch("http://localhost:3001/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( player),
    });
    const newPlayer = await response.json();
    
    dispatch(setStatus(REQ_STATUS.success));
    console.log(newPlayer);
    dispatch(addPlayer(newPlayer));
    dispatch(clearSelectedPlayer());
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
  }
};

