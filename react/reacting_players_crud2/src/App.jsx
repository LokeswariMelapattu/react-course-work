/** @format
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Add authentication to the app.
 * 
 * Backend is still using Basic Auth.
 * 
 * REMEMBER: use the correct ids, classes and attributes in the exercise in the correct places to pass the tests. Remember to pass in the appropriate props to the child components. 

 * BEWARE: the tests will not pass if you use the wrong props.
 */

import { AuthUser } from "./components/AuthUser.jsx";

const url = "http://localhost:3001/api/users";

import { AddPlayer } from "./components/AddPlayer";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
const apiurl = "http://localhost:3001/api/players/";


import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

import React, { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState(REQ_STATUS.loading); // Request status state
  const [players, setPlayers] = useState([]); // List of players
  const [currentPlayer, setCurrentPlayer] = useState(null); // Currently selected player
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   // Handle login
   const onLogin = async (username, password) => {
    // Basic Authentication request
    try {
      setStatus(REQ_STATUS.loading);
      // const response = await fetch(url, {
      //   method: "GET",
      //   headers: {
      //     "Authorization": "Basic " + btoa(username + ":" + password),
      //   },
      // });
      
      // if (response.ok) {
        setIsLoggedIn(true);
        setUsername(username); // Store username for potential logout
        setPassword(password); // Store password (for future login handling)
        setStatus(REQ_STATUS.success);
      // } else {
      //   setStatus(REQ_STATUS.error);
      //   throw new Error("Failed to log in");
      // }
    } catch (error) {
      setStatus(REQ_STATUS.error);
      console.error(error);
    }
  };

  // Handle register
  const onRegister = async (user, pwd) => {
    // Since backend authentication uses Basic Auth, no actual registration logic here,
    // For simplicity, we'll assume the user is automatically registered upon login attempt.
    try {
          setStatus(REQ_STATUS.loading);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username:user, password: pwd})
          }); 
          if (response.ok) { 
            setUsername(user);
            setPassword(pwd);
            setIsLoggedIn(true);
            setStatus(REQ_STATUS.success);
          } else {
            setStatus(REQ_STATUS.error);
            throw new Error("Failed to log in");
          }
        } catch (error) {
          setStatus(REQ_STATUS.error);
          console.error(error);
        }
  };

  // Handle logout
  const onLogout = () => {
    console.log('logout');
    setStatus(REQ_STATUS.loading);
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setStatus(REQ_STATUS.success);
  };

 // Fetch all players
 const fetchPlayers = async () => {
  try {
    setStatus(REQ_STATUS.loading); 
    const response = await fetch(apiurl,{
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password),
        },
    });
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
    console.log('getplayer');
    setStatus(REQ_STATUS.loading);
    const response = await fetch(`${apiurl}${playerId}`,{
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password),
        },
    });
    if (!response.ok) {
      setStatus(REQ_STATUS.error);
      throw new Error("Failed to fetch player");
    }
    const data = await response.json();
    console.log('getplayer data');
    console.log(data);
    setCurrentPlayer(data);
    console.log('current player data');
    console.log(currentPlayer);
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
  const response = await fetch(`${apiurl}`,
    {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(username + ":" + password),
        },
        body: JSON.stringify(player),
      });
      if (!response.ok) {
        setStatus(REQ_STATUS.error);
        throw new Error("Failed to fetch player");
      }
      setStatus(REQ_STATUS.success);
      setPlayers([...players, player]);
    } catch (error) {
      setStatus(REQ_STATUS.error);
      console.error(error);
    }
  };

  const getMaxId = () => {
    if (players.length === 0) return 0;
    return players.reduce((maxId, player) => (player.id > maxId ? player.id : maxId), 0);
  };

  // Update player to the backend
  const updatePlayer = async (status) => {
    try {
      setStatus(REQ_STATUS.loading);
      var player = { ...currentPlayer, isActive: status };
       setCurrentPlayer(player);
       
      const response = await fetch(`${apiurl}${player.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(username + ":" + password),
        },
        body: JSON.stringify(player),
      });
      if (!response.ok) { 
        setStatus(REQ_STATUS.error);
        throw new Error("Failed to fetch player");
      }
      setStatus(REQ_STATUS.success);
      await fetchPlayers();
    } catch (error) {
      setStatus(REQ_STATUS.error);
      console.log(error);
    }
  };

//delete player

const deletePlayer = async (id) => {
try{
  setStatus(REQ_STATUS.loading); 
  const response = await fetch(`${apiurl}${id}`,{
    method:"DELETE",
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password),
        },
  });
  if (!response.ok) {
    setStatus(REQ_STATUS.error);
    throw new Error("Failed to fetch player");
  }
  else
  {
    setStatus(REQ_STATUS.success);
  const updatedPlayers = players.filter(player => player.id !== id);
  setPlayers(updatedPlayers); 
  setCurrentPlayer(null);
  }
  
}
catch(error){
  setStatus(REQ_STATUS.error);
  console.log(error); 
}
};
// Fetch players on initial render
useEffect(() => {
    if (isLoggedIn) fetchPlayers();
    setStatus(REQ_STATUS.loading);
  }, [isLoggedIn]);

  return (
    <div>
      <RequestStatus>{status}</RequestStatus>
      <AuthUser isLoggedIn={isLoggedIn} onLogin={onLogin} onRegister={onRegister} onLogout={onLogout} />
      {isLoggedIn && (
        <>
          <AddPlayer handleSubmit={addPlayer} />
          <ListPlayers players={players} getPlayer={getPlayer} />
        </>
      )}
      <SelectedPlayer player={currentPlayer} handleUpdate={updatePlayer} handleDelete={deletePlayer} />
    </div>
  );
}

export default App;