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
import { postPlayer } from "../redux/actionCreators/thunks/AddPlayer";

export const AddPlayer = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    const newplayer= {name:name}
    e.preventDefault();
      dispatch(postPlayer(newplayer)); 
      setName("");  
  };

  return (
    <div id="add-player">
      <form onSubmit={handleFormSubmit}>
        <label id="input-player-label" htmlFor="input-player">Name</label>
        <input
          id="input-player"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="input-player"
        />
        <button type="submit" className="btn-add">
          Add Player
        </button>
      </form>
    </div>
  );
};

