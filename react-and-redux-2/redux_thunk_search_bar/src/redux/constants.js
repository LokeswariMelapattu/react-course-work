/** @format CONSTANTS */

// Exercise redux constants

// types that concern statusReducer
export const REQ_STATUS = {
    loading: "Loading...",
    success: "Finished!",
    error: "An error has occurred!!!",
  };
export const SET_REQUEST_STATUS = 'SET_REQUEST_STATUS';
export const LOADING = 'LOADING';
export const READY = 'READY';
export const ERROR = 'ERROR';

// types that concern playersReducer
export const SET_PLAYERS = 'SET_PLAYERS';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';

// types that concern SELECTEDPlayerReducer
export const SET_SELECTED_PLAYER = 'SET_SELECTED_PLAYER';
export const UPDATE_SELECTED_PLAYER = 'UPDATE_SELECTED_PLAYER';
export const CLEAR_SELECTED_PLAYER = 'CLEAR_SELECTED_PLAYER';
export const DELETE_SELECTED_PLAYER = 'DELETE_SELECTED_PLAYER';

// types that concern searchReducer
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const FETCH_FILTERED_PLAYERS = "FETCH_FILTERED_PLAYERS";
export const SET_FILTERED_PLAYERS = "SET_FILTERED_PLAYERS";