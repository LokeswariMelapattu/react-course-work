/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = ({ players, getPlayer }) => {
  // Fallback for invalid players data (null or not an array)
  const validPlayers = Array.isArray(players) ? players : [];

  return (
    <div>
      <h2>Players List</h2>
      <ul id="players-list">
        {validPlayers.length === 0 ? (
          <li>No players available</li> // Show a message if no players are available
        ) : (
          validPlayers.map((player) => (
            <ListPlayer key={player.id} player={player} onClick={() => getPlayer(player.id)} />
          ))
        )}
      </ul>
    </div>
  );
};