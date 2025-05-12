/**
 * Implement the reducer for your redux store.
 */

import * as actions from './actionTypes.js';

/**
 * Get the new state of the application after the action is performed on the previous state
 *
 * The application state is an array of players where each player is an object
 * having the following structure:
 *
 *   {
 *     id: 2,  // Player id (positive integer, unique among all players)
 *     name: 'Player Name',  // Player name (string)
 *     isActive: false  // Player status (boolean)
 *   }
 *
 * The id of each player should be unique. When adding and removing players
 * you need to ensure this. How you choose to do this is up to you but array
 * index is not adequate. Also notice that the IDs should be positive integers
 * which means that zero is not allowed.
 *
 * The reducer should be able to accept and consume action object created by the
 * action creator functions you created in actionCreators.js
 *
 * Return the previous state unmodified if the action is of unknown type or
 * otherwise invalid.
 *
 * Use the constants from actionTypes.js to match the type value of the
 * action object. Don't use the plain string values directly!
 *
 * REMEMBER TO ALWAYS RETURN A NEW COPY OF THE STATE WHEN THE STATE IS MODIFIED!!
 *
 * @param {Array} state previous application state (array of players)
 * @param {object} action action object with keys 'type' and 'payload'
 * @returns {Array} the new state of the application
 */

const playersReducer = (state = [], action) => {
    switch (action.type) {
      case actions.ADD_PLAYER: 
        const newId = state.length > 0 ? Math.max(...state.map(player => player.id)) + 1 : 1;
        return [
          ...state,
          {
            id: newId,
            name: action.payload.name,
            isActive: action.payload.isActive,
          },
        ];
  
      case actions.REMOVE_PLAYER:
        return state.filter(player => player.id !== action.payload.id);
  
      case actions.TOGGLE_PLAYER_STATUS:
        return state.map(player =>
          player.id === action.payload.id
            ? { ...player, isActive: !player.isActive }
            : player
        );
  
      default:
        return state;
    }
  };
  
export default playersReducer;

