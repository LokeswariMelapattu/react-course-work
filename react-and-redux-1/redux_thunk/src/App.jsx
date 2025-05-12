/** @format CONTAINERS
 *  In this exercise, you will be integrating thunk, which is a middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 *
 * The fetch functions will be moved into the thunk action creators. Each action creator will be responsible for handling the request while keeping the application up to date with loading, success, and failure actions.
 * You can find the template files for the action creators in the src/redux/actionCreators/thunks folder. Each thunk has been separated based on the component that will be using it, and can be found in the corresponding folder with the same name as the component.
 *
 * At the end of the day, in an ideal situation, your app should function with the current template jsx and logic(see below), with the fetch functions moved into the thunk action creators and possible hooks moved to the components that need them.
 *
 * You can however copy paste the App.jsx file from the previous exercises into this file so that you may start off with a working app.
 */

/** @format CONTAINERS */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";

// Import Redux Thunks
import { getPlayers } from "./redux/actionCreators/thunks/ListPlayers";
import { getSelectedPlayer } from "./redux/actionCreators/thunks/ListPlayer";
import { postPlayer } from "./redux/actionCreators/thunks/AddPlayer";
import { updateSelectedPlayer, deleteSelectedPlayer } from "./redux/actionCreators/thunks/SelectedPlayer";

function App() {
  const dispatch = useDispatch();

  // Get players, selectedPlayer, and request status from Redux store
  const players = useSelector((state) => state.players);
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const status = useSelector((state) => state.requestStatus);

  // Fetch all players on mount
  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <div>
      <RequestStatus>{status}</RequestStatus>
      <AddPlayer handleSubmit={(name) => dispatch(postPlayer(name))} />
      <ListPlayers players={players} getPlayer={(id) => dispatch(getSelectedPlayer(id))} />
      <SelectedPlayer 
        player={selectedPlayer} 
        handleUpdate={(status) => dispatch(updateSelectedPlayer(status))} 
        handleDelete={() => dispatch(deleteSelectedPlayer())} 
      />
    </div>
  );
}

export default App;
