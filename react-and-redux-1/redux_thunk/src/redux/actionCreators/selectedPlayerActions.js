/** @format NORMAL ACTION CREATORS */

// SELECTED PLAYER ACTION CREATORS

/**
 * @description normal action creator that returns an action with type SET_SELECTED_PLAYER to the frontend's reducers along with the payload that includes a player.
 * @param {Object} player - The player that is to be stored in state
 * @return {Object} action
 */
import { SET_SELECTED_PLAYER, CLEAR_SELECTED_PLAYER } from "../constants"

export const setSelectedPlayer = (player) => {
    return {
      type: SET_SELECTED_PLAYER,  // Define the action type
      payload: player,              // The player object is passed as the payload
    };
  };
  
  /**
   * @description normal action creator that returns an action with type CLEAR_SELECTED_PLAYER to the frontend's reducers.
   * @return {Object} action
   */
  export const clearSelectedPlayer = () => {
    return {
      type: CLEAR_SELECTED_PLAYER,  // Action type to clear the selected player
    };
  };
  