
import PlayerRow from "./PlayerRow";

function PlayerTable({ players }) {
  return (
    <section className="player-table">
      <h2>Jugadores</h2>

      <table className="player-table__table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Posición</th>
            <th>Edad</th>
            <th>Goles</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PlayerTable;
