/** @format */

/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */

  import { useSelector } from 'react-redux';
import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = ({ selectPlayer }) => {
    // Access players data from the Redux store
    const players = useSelector((state) => state.players); // Assuming `players` is the key in the Redux store

    // Fallback for invalid players data (null or not an array)
    const validPlayers = Array.isArray(players) ? players : []; 

  return (
    <div>
      <h2>List of players</h2>
      <ul id="players-list">
        {validPlayers.length === 0 ? (
          <li>No players available</li> // Show a message if no players are available
        ) : (
          validPlayers.map((player) => (
            <ListPlayer 
              key={player.id}
              {...player}
              onClick={() => selectPlayer(player.id)} // Use selectPlayer here
            />
          ))
        )}
      </ul>
    </div>
  );
};
