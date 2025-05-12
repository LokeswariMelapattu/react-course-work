/** @format
 *
 * Shoer instructions
 * ------------------     
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

export const ListPlayer = ({ player, onClick }) => {
    // Handle click event
    const handleClick = (e) => {
      e.preventDefault();  // Prevent default behavior of the anchor tag
      onClick(player.id);  // Call onClick with the player's id
    };
  
    return (
      <li id={`player-${player.id}`}>
        <a href="" onClick={handleClick}>
          {player.name}
        </a>
      </li>
    );
  };