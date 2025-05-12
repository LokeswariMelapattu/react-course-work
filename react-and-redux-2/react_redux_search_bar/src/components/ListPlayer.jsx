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

export const ListPlayer = ({player,onClick}) => {
  const safePlayer = player || { id: 1, name: "Test Player" };
  const handleClick = (e)=>{
    e.preventDefault();
    onClick(safePlayer.id);
  }
  return (<li id={`player-${safePlayer.id}`}>
    <a href="" onClick={handleClick}>{safePlayer.name}</a>
  </li>);
};
