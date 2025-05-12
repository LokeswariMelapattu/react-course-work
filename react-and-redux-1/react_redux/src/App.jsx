/** @format 
 * 
 * Student instructions:
 * Copy paste the App.jsx file from the previous exercises into this file.
 *  In this exercise, you will be introducing redux, which is a state 
 * management library that allows you to manage the state of your application
 *  in a single store. The store is a single source of truth for the state of
 *  your application, and it is the only place where the state can be updated.
 *  
 * 
 * The fetch functions will start using action creators from now on. 
 * Each action creator will be responsible for updating the redux store with
 *  the data from the request. You can find the template files for the action
 *  creators in the src/redux/actionCreators folder. It is your job to 
 * implement them, as well as the reducers that will be used to update the 
 * store. The reducers can be found in the src/redux/reducers folder.
 * 
  Hint: Use the provided REQ_STATUS object to update the request status 
  when necessary. "loading" for when the request is in progress,
   "success" for when the request is successful,
    and "error" for when the request has failed. The REQ_STATUS object is imported from the "../cypress/e2e/constants.js" file.

*/

const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux"; 
// Import Redux actions

import { setPlayers } from './redux/actionCreators/playersActions';
import { setSelectedPlayer, clearSelectedPlayer } from './redux/actionCreators/selectedPlayerActions';
import { setStatus } from './redux/actionCreators/statusActions';
function App() {
  const players = useSelector((state) => state.players);
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch(); // Use dispatch to send actions to Redux store

 // Fetch all players
 const fetchPlayers = async () => {
  try {
    dispatch(setStatus(REQ_STATUS.loading));
    const response = await fetch(url);
    if (!response.ok) {
      dispatch(setStatus(REQ_STATUS.error));
      throw new Error("Failed to fetch players");
    }
    const data = await response.json();
    dispatch(setPlayers(data));
    dispatch(setStatus(REQ_STATUS.success));
  } catch (error) {
    setStatus(REQ_STATUS.error);
    console.error(error);
  }
};

// Fetch specific player by ID
const selectPlayer = async (playerId) => {
  try {
    dispatch(setStatus(REQ_STATUS.loading));
    const response = await fetch(`${url}/${playerId}`);
    if (!response.ok) {
      dispatch(setStatus(REQ_STATUS.error));
      throw new Error("Failed to fetch player");
    }
    const data = await response.json();
    console.log(data);
    dispatch(setSelectedPlayer(data));
    dispatch(setStatus(REQ_STATUS.success));
    console.log('status');
  } catch (error) {
    dispatch(setStatus(REQ_STATUS.error));
    console.error(error);
  }
};

// Fetch players on initial render
useEffect(() => {
  fetchPlayers();
}, [dispatch]);


  return <div>
      <RequestStatus>{status}</RequestStatus>  
      <ListPlayers players={players} selectPlayer={selectPlayer} />  
      <SelectedPlayer />
  </div>;
}

export default App;

