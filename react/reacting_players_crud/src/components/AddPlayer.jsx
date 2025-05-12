/** @format
 *
 * Short instructions:
 * Create a AddPlayer component.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use right ids, classes and attributes in the exercise, refer to the tests.
 *
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
        <button type="submit" id="submit-button" className="btn-add" >
          Add Player
        </button>
    </form>
  </div>;
};
