
function PlayerRow({ player }) {
  return (
    <tr>
      <td>{player.number}</td>
      <td>{player.name}</td>
      <td>{player.team}</td>
      <td>{player.position}</td>
      <td>{player.age}</td>
      <td>{player.goals}</td>
    </tr>
  );
}

export default PlayerRow;
