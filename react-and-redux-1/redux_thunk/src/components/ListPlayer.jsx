/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only name and id are passed to this component as props. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */
  
import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer"; // Update path if needed

export const ListPlayer = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleSelectPlayer = (e) => {
    e.preventDefault(); // Prevent default behavior
    dispatch(getSelectedPlayer(id)); // Fetch player details using Redux
  };

  return (
    <li role="listitem" id={`player-${id}`}>
      <a role="link" onClick={handleSelectPlayer}>
        {name}
      </a>
    </li>
  );
};
