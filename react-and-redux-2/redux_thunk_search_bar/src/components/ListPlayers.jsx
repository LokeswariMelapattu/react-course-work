/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */

import { ListPlayer } from "./ListPlayer.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import{fetchFilteredPlayers} from "../redux/actionCreators/thunks/fetchFilteredPlayers.js";
import { getPlayers } from "../redux/actionCreators/thunks/ListPlayers.js";


export const ListPlayers = ({handleSelectPlayer}) => {
  

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPlayers = useSelector((state) => state.players.filteredPlayers);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    dispatch(fetchFilteredPlayers(query));
  };
  

  if (!Array.isArray(filteredPlayers) || filteredPlayers.length === 0) {
    return <div>No Players</div>;
  }else{
    return (<div>
      <h2>List of players</h2>
      <input
        type="text"
        id="searchbar"
        placeholder="Search players by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {filteredPlayers.length === 0 ? (
        <div>No Players Found</div>
      ) : ( 
        <ul id="players-list">
          {filteredPlayers.map((player) => (
            <ListPlayer
              key={player.id}
              player={player}
              onClick={() => handleSelectPlayer(player.id)}
            />
          ))}
        </ul>
      )}
    </div>);
  }
  
};
