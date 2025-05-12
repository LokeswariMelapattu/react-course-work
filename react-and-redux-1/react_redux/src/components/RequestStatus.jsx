/** @format */

import { useSelector } from "react-redux";
/** @format
 * @description
 * Student instructions:
 * Copy paste your code from the RequestStatus.jsx file here from the previous week. Implement redux logic to fetch the status from the redux store.
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 */
 

export const RequestStatus = () => {
    // Get the request status from the Redux store
    const status = useSelector((state) => state.status); // Assuming `status` is the key in your Redux store

  return (
    <div >
      <h3>Request status</h3>
      <p id="request-status">{status}</p>
    </div>
  );
};
