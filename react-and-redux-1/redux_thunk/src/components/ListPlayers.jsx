/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../redux/actionCreators/thunks/ListPlayers";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer";
import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players); // Assuming `players` is in Redux store

  useEffect(() => {
    dispatch(getPlayers()); // Fetch players on component mount
  }, [dispatch]);

  const handleSelectPlayer = (id) => {
    dispatch(getSelectedPlayer(id)); // Fetch selected player when clicked
  };

  return (
    <div>
      <h2>List of Players</h2>
      <ul id="players-list">
        {players.length === 0 ? (
          <li>No players available</li> // Show a message if no players exist
        ) : (
          players.map((player) => (
            <ListPlayer 
              key={player.id}
              {...player}
              onClick={() => handleSelectPlayer(player.id)} // Fetch player details when clicked
            />
          ))
        )}
      </ul>
    </div>
  );
};
