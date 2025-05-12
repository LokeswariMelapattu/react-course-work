/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import React, { useState } from "react";
export const AddPlayer = ({handleSubmit}) => {
  const [playerName, setPlayerName] = useState("");  

  const onSubmit  = (event) =>{
   
    event.preventDefault(); 
    if (handleSubmit) {
      const formData = new FormData(event.target); 
      const name = formData.get("input-player"); 
      handleSubmit(name);  
      setPlayerName("");
    }
  };
  return <div>
    <h2>Add Player</h2>
    <form onSubmit={onSubmit}>
    <label htmlFor="input-player">Name</label>
        <input
          type="text"
          id="input-player"
          name="input-player"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)} 
          required
          placeholder="Enter player name" 
        />
        <button type="submit" id="submit-player" className="btn-add" >
          Add Player
        </button>
    </form>
  </div>;
};
