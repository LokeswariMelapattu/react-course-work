/** @format
 * @description
 * Student instructions:
 *
 * - Use the useDispatch hook to access the Redux dispatch function.
 * 
 * - Define a function named handleSearch that:
        - Takes the input event (e) as an argument.
        - Dispatches the setSearchQuery action with the current input value (e.target.value).

* -Add an <input> element inside the SearchBar component with the following attributes:
    - id: Set to "searchbar" for identification.
    - type: Set to "text".
    - placeholder: Set to "Search players...".
    - onChange: Set to call the handleSearch function when the input value changes.
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/actionCreators/searchActions';

export const SearchBar = () => {
    console.log("hello")
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <input 
            id="searchbar"
            type="text"
            placeholder="Search players..."
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
