/** @format NORMAL ACTION CREATORS
 * These are the action creators that are used in the thunks.
 */

/**
 * @description normal action creator that returns an action with type SET_PLAYERS to the frontend's reducers along with the payload that includes players.
 * @param {Array} players - The players' ids and names in an array.
 * @return {Object} action
 */

import { SET_PLAYERS, ADD_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER } from '../constants';

export const setPlayers = (players) => {
    return {
      type: SET_PLAYERS,  // Define the action type
      payload: players,     // The players array is included as the payload
    };
  };
  
  /**
   * @description normal action creator that returns an action with type ADD_PLAYER to the frontend's reducers along with the payload that includes a player.
   * @param {Object} player - The player with id and name that is to be included in the store.
   * @return {Object} action
   */
  export const addPlayer = (player) => {
    return {
      type: ADD_PLAYER,   // Action type to add a new player
      payload: player,      // Player object is included as the payload
    };
  };
  
  /**
   * @description normal action creator that returns an action with type REMOVE_PLAYER to the frontend's reducers along with the payload of playerId.
   * @param {String} playerId - The player's id.
   * @return {Object} action
   */
  export const removePlayer = (playerId) => {
    return {
      type: REMOVE_PLAYER,  // Action type to remove a player
      payload: { id: playerId },      // Player's id is included as the payload
    };
  };
  
  /**
   * @description normal action creator that returns an action with type UPDATE_PLAYER to the frontend's reducers along with the payload of the player.
   * @param {Object} player - The player with id and name that is to be updated in the store.
   * @return {Object} action
   */
  export const updatePlayer = (player) => {
    return {
      type: UPDATE_PLAYER,  // Action type to update an existing player
      payload: player,        // Updated player object is included as the payload
    };
  };
  