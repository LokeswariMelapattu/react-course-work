/** @format
 *
 * @description
 * Student instructions:
 *
 * Copy contents for this file from the players_fetch exercise of the react week. There are no changes to this file otherwise
 *
 *
 *
 */

export const ListPlayer = ({ id, name, onClick }) => {
  // Handle click event
  const handleClick = (e) => {
    e.preventDefault();  // Prevent default behavior of the anchor tag
    onClick(id);  // Call onClick with the player's id
  };

  return (
   
    <li role="listitem" id={`player-${id}`}>
      <a role="link" href="#" onClick={handleClick}>
        {name}
      </a>
    </li>
  );
};
