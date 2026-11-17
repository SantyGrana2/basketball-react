
import PlayerRow from "./PlayerRow";

const columns = [
  { key: "number", label: "Número" },
  { key: "name", label: "Nombre" },
  { key: "team", label: "Equipo" },
  { key: "position", label: "Posición" },
  { key: "age", label: "Edad" },
  { key: "goals", label: "Goles" }
];

function PlayerTable({
  players,
  sortConfig,
  onSort
}) {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";

    if (sortConfig.direction === "asc") {
      return "↑";
    }

    if (sortConfig.direction === "desc") {
      return "↓";
    }

    return "↕";
  };

  return (
    <section className="player-table">
      <h2>Listado de jugadores</h2>

      <table className="player-table__table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                aria-sort={
                  sortConfig.key === column.key
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <button
                  type="button"
                  className="player-table__sort"
                  onClick={() => onSort(column.key)}
                >
                  {column.label}
                  <span aria-hidden="true">
                    {getSortIcon(column.key)}
                  </span>
                </button>
              </th>
            ))}
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

      {players.length === 0 && (
        <p className="player-table__empty">
          No se encontraron jugadores.
        </p>
      )}
    </section>
  );
}

export default PlayerTable;
