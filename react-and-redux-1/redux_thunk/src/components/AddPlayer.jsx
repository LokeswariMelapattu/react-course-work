/** @format
 *
 * Student instructions:
 *  * Copy contents for this file from the previous exercise round's exercises
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { postPlayer } from "../redux/actionCreators/thunks/AddPlayer"; // Adjust path if needed

export const AddPlayer = () => {
  const [playerName, setPlayerName] = useState("");  
  const dispatch = useDispatch();

  const onSubmit =  (event) => {
    event.preventDefault();
    
   // if (playerName.trim()) { // Prevent empty submissions
      dispatch(postPlayer({ name:playerName, isActive: false })); // Dispatch Redux action
      setPlayerName(""); // Clear input field after submission
   // }
  };

  return (
    <div>
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
        <button type="submit" id="submit-button" className="btn-add">
          Add Player
        </button>
      </form>
    </div>
  );
};
