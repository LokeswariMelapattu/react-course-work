/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only name and id are passed to this component as props. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */
import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer";
export const ListPlayer = ({player}) => {
	const dispatch = useDispatch();
	const safePlayer = player || { id: 1, name: "Test Player" };
	const handleClick = (e)=>{
	  e.preventDefault();
		dispatch(getSelectedPlayer(safePlayer.id)); 
	}
	return (<li id={`player-${safePlayer.id}`}>
	  <a href="" onClick={handleClick}>{safePlayer.name}</a>
	</li>);
  };