/** @format THUNK*/

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
import { setPlayers } from "../playersActions";
import { setStatus } from "../statusActions";
import { REQ_STATUS } from "../../constants";

export const getPlayers = () => async (dispatch) => {
  try {
    dispatch(setStatus(REQ_STATUS.loading));
    const response = await fetch("http://localhost:3001/api/players");
    const data = await response.json();
    dispatch(setStatus(REQ_STATUS.success));
    console.log(data);
    dispatch(setPlayers(data));
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
  }
};
