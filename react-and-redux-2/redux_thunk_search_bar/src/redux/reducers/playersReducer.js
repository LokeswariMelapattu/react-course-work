/** @format REDUCERS*/

import {
	ADD_PLAYER,
	REMOVE_PLAYER,
	SET_PLAYERS,
	UPDATE_PLAYER,
	SET_FILTERED_PLAYERS,
} from '../constants';

const defaultState = {
	players: [],
	filteredPlayers: [],
  };

/**
 * @description reducer for players that returns the players ids and names in an array. The default state is an empty array. The action types are SET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER and UPDATE_PLAYER.  
 * - SET_PLAYERS action returns the payload that includes players. 
 * - ADD_PLAYER action returns the state with the new player added to the array. 
 * - REMOVE_PLAYER action returns the state where the specified player is removed from the array. 
 * - UPDATE_PLAYER action returns the state where the specified player is updated in the array.

 * @param {*} state - The players in an array.
 * @param {*} action - The action to be performed.
 * @returns {Array} - The players in an array.
 */
const playersReducer = (state = defaultState, action) => {
	switch (action.type) {
	  case SET_PLAYERS:
		return {
		  ...state,
		  players: action.payload, 
		  filteredPlayers: action.payload, 
		};
  
	  case ADD_PLAYER:
		return {
		  ...state,
		  players: [...state.players, action.payload],
		  filteredPlayers: [...state.filteredPlayers, action.payload],
		};
  
	  case REMOVE_PLAYER:
		return {
		  ...state,
		  players: state.players.filter((player) => player.id !== action.payload.id),
		  filteredPlayers: state.filteredPlayers.filter((player) => player.id !== action.payload.id),
		};
  
	  case UPDATE_PLAYER:
		return {
		  ...state,
		  players: state.players.map((player) =>
			player.id === action.payload.id ? { ...player, ...action.payload } : player
		  ),
		  filteredPlayers: state.filteredPlayers.map((player) =>
			player.id === action.payload.id ? { ...player, ...action.payload } : player
		  ),
		};
  
	  case SET_FILTERED_PLAYERS:
		return {
		  ...state,
		  filteredPlayers: action.payload, 
		};
  
	  default:
		return state;
	}
  };
  
  export default playersReducer;