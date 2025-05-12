/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the right ids, classes and attributes in the exercise to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
  */
  import { AddPlayer } from "./components/AddPlayer";
  import { REQ_STATUS } from "../cypress/e2e/constants.js";
  const url = "http://localhost:3001/api/players/";


  import { ListPlayers } from "./components/ListPlayers.jsx";
  import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
  import { RequestStatus } from "./components/RequestStatus.jsx";

  import React, { useState, useEffect } from "react";

  function App() {
    const [status, setStatus] = useState(REQ_STATUS.loading); // Request status state
    const [players, setPlayers] = useState([]); // List of players
    const [currentPlayer, setCurrentPlayer] = useState(null); // Currently selected player

  // Fetch all players
  const fetchPlayers = async () => {
    try {
      setStatus(REQ_STATUS.loading);
      const response = await fetch(url);
      if (!response.ok) {
        setStatus(REQ_STATUS.error);
        throw new Error("Failed to fetch players");
      }
      const data = await response.json();
      setPlayers(data);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      setStatus(REQ_STATUS.error);
      console.error(error);
    }
  };

  // Fetch specific player by ID
  const getPlayer = async (playerId) => {
    try {
      setStatus(REQ_STATUS.loading);
      const response = await fetch(`${url}${playerId}`);
      if (!response.ok) {
        setStatus(REQ_STATUS.error);
        throw new Error("Failed to fetch player");
      }
      const data = await response.json();
      setCurrentPlayer(data);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      setStatus(REQ_STATUS.error);
      console.error(error);
    }
  };

  //Add player to the backend

  const addPlayer = async (name) =>{
  try{
    console.log(`name:${name}`); 
    setStatus(REQ_STATUS.loading);
    var player = {id: getMaxId()+1, name: name, isActive: false};
    const response = await fetch(`${url}`,
      {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(player)
      }
    );
      if (!response.ok) {
        setStatus(REQ_STATUS.error);
        throw new Error("Failed to fetch player");
      } 
      setStatus(REQ_STATUS.success); 
      setPlayers([...players, player]);
  } 
  catch (error) {
      setStatus(REQ_STATUS.error);
      console.error(error);
    }
  };
  const getMaxId = () => {
    if (players.length === 0) return 0;  
    return players.reduce((maxId, player) => (player.id > maxId ? player.id : maxId), 0);
  };
  //update player to the backcend
  const updatePlayer = async (status) =>{
  try
  {
    setStatus(REQ_STATUS.loading);
  var player = {...currentPlayer, isActive:status}
  setCurrentPlayer(player);
  const response =await fetch(`${url}${player.id}`,
    {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(player)
    });
    
    if (!response.ok) {
      setStatus(REQ_STATUS.error);
      throw new Error("Failed to fetch player");
    }
    setStatus(REQ_STATUS.success);
    await fetchPlayers(); 
    //setCurrentPlayer(null);
  }
  catch(error)
  {
    setStatus(REQ_STATUS.error);
    console.log(error);
  }
  };

  //delete player

  const deletePlayer = async (id) => {
  try{
    setStatus(REQ_STATUS.loading); 
    const response = await fetch(`${url}${id}`,{
      method:"DELETE"
    });
    if (!response.ok) {
      setStatus(REQ_STATUS.error);
      throw new Error("Failed to fetch player");
    }
    setStatus(REQ_STATUS.success);
    const updatedPlayers = players.filter(player => player.id !== id);
    setPlayers(updatedPlayers); 
    setCurrentPlayer(null);
  }
  catch(error){
    setStatus(REQ_STATUS.error);
    console.log(error); 
  }
  };
  // Fetch players on initial render
  useEffect(() => {
    fetchPlayers();
  }, []);


    return <div>
        <RequestStatus>{status}</RequestStatus>  
        <AddPlayer handleSubmit={addPlayer} />  
        <ListPlayers players={players} getPlayer={getPlayer} /> 
        <SelectedPlayer player={currentPlayer} handleUpdate={updatePlayer} handleDelete={deletePlayer} />
    </div>;
  }

  export default App;