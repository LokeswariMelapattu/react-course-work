/** @format */

/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */

import { ListPlayer } from "./ListPlayer.jsx";
import { useSelector} from "react-redux";


export const ListPlayers = ({handleSelectPlayer}) => {
  const players = useSelector((state) => state.players);
  const searchQuery = useSelector((state) => state.searchQuery) || "";

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  

  if (!Array.isArray(players) || players.length === 0) {
    return <div>No Players</div>;
  }else{
    return ( <div>
            <h2>Players List</h2>
            <ul id="players-list">
                {filteredPlayers.map((player) => (
                    <ListPlayer key={player.id} player={player} onClick={handleSelectPlayer} />
                ))}
            </ul>
        </div>);
  }
  
};