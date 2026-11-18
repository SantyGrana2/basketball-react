
import PlayerRow from "./PlayerRow";

function PlayerTable({
  players,
  sortConfig,
  onSort,
  favoriteIds = [],
  onToggleFavorite,
  onViewDetails
}) {
  const columns = [
    { key: "number", label: "Número" },
    { key: "name", label: "Nombre" },
    { key: "team", label: "Equipo" },
    { key: "position", label: "Posición" },
    { key: "age", label: "Edad" },
    { key: "goals", label: "Goles" }
  ];

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) {
      return "↕";
    }

    if (sortConfig.direction === "asc") {
      return "↑";
    }

    if (sortConfig.direction === "desc") {
      return "↓";
    }

    return "↕";
  };

  const getSortLabel = (key, label) => {
    if (sortConfig?.key !== key) {
      return `Ordenar ${label}`;
    }

    if (sortConfig.direction === "asc") {
      return `${label}: orden ascendente`;
    }

    return `${label}: orden descendente`;
  };

  return (
    <section className="player-table">
      <h2 className="player-table__title">
        Listado de jugadores
      </h2>

      <div className="player-table__wrapper">
        <table className="player-table__table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  <button
                    type="button"
                    className="player-table__sort"
                    onClick={() => onSort(column.key)}
                    aria-label={getSortLabel(
                      column.key,
                      column.label
                    )}
                  >
                    <span>{column.label}</span>

                    <span
                      className="player-table__sort-icon"
                      aria-hidden="true"
                    >
                      {getSortIcon(column.key)}
                    </span>
                  </button>
                </th>
              ))}

              <th scope="col">Favorito</th>
              <th scope="col">Detalles</th>
            </tr>
          </thead>

          <tbody>
            {players.length > 0 ? (
              players.map((player) => (
                <PlayerRow
                  key={player.id}
                  player={player}
                  isFavorite={favoriteIds.includes(player.id)}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetails={onViewDetails}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="player-table__empty"
                >
                  No se encontraron jugadores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PlayerTable;
